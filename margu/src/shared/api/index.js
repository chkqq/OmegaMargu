const REMOTE_API_BASE = 'https://promo-prk.marsu.ru/promo-prk/web/api';
const LOCAL_PROXY_BASE = '/marsu-api';
const DEFAULT_BASE = import.meta.env.DEV ? LOCAL_PROXY_BASE : REMOTE_API_BASE;
const DEFAULT_LANGUAGE = 'ru';
const REQUEST_TIMEOUT_MS = 15000;
let specialityCardsRequest = null;
let ugsRequest = null;

export const API_BASE = (import.meta.env.VITE_MARSU_API_BASE || DEFAULT_BASE).replace(/\/$/, '');

export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {number} status
   * @param {unknown} payload
   */
  constructor(message, status, payload) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

/**
 * @param {string|number|null|undefined} token
 * @param {Record<string, string>} [headers]
 * @param {boolean} [hasBody]
 */
function buildHeaders(token, headers = {}, hasBody = false) {
  const next = {
    Accept: 'application/json',
    'Accept-Language': DEFAULT_LANGUAGE,
    ...headers,
  };

  if (hasBody && !(bodyIsForm(headers) || next['Content-Type'])) {
    next['Content-Type'] = 'application/json';
  }

  if (token) {
    next.Authorization = `Bearer ${token}`;
    next['Abiturient-Token'] = String(token);
  }

  return next;
}

/** @param {Record<string, string>|undefined} headers */
function bodyIsForm(headers) {
  return headers?.['Content-Type']?.includes('application/x-www-form-urlencoded');
}

/** @param {Response} res */
async function readResponse(res) {
  if (res.status === 204) return null;

  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * @param {string} path
 * @param {{ method?: string, body?: unknown, token?: string|null, query?: Record<string, string|number|null|undefined>, headers?: Record<string, string> }} [options]
 */
async function request(path, options = {}) {
  const {
    method = 'GET',
    body,
    token = null,
    query,
    headers,
  } = options;

  const url = new URL(
    `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`,
    globalThis.location?.origin ?? REMOTE_API_BASE,
  );
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const hasBody = body !== undefined && body !== null;
  const isUrlEncoded = body instanceof URLSearchParams;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  let res;

  try {
    res = await fetch(url.toString(), {
      method,
      headers: buildHeaders(token, headers, hasBody),
      body: hasBody
        ? (isUrlEncoded ? body.toString() : JSON.stringify(body))
        : undefined,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
  const data = await readResponse(res);

  if (!res.ok) {
    const message =
      (data && typeof data === 'object' && 'message' in data && data.message) ||
      `Ошибка запроса: ${res.status}`;
    throw new ApiError(String(message), res.status, data);
  }

  return data;
}

/** @param {unknown} data */
function unwrapData(data) {
  if (data && typeof data === 'object' && 'data' in data) return data.data;
  return data;
}

/** @param {unknown} data */
function asList(data) {
  const source = unwrapData(data);
  if (Array.isArray(source)) return source;
  if (source && typeof source === 'object' && Array.isArray(source.data)) return source.data;
  return [];
}

/** @param {string|null|undefined} value */
function fixAssetUrl(value) {
  if (!value) return null;
  return String(value)
    .replace(/^https?:\\+/, match => match.startsWith('https') ? 'https://' : 'http://')
    .replace(/\\/g, '/');
}

/** @param {unknown} value */
function toText(value) {
  return value === null || value === undefined ? '' : String(value);
}

/** @param {string} title */
function extractProgramCode(title) {
  return title.match(/\b\d{2}\.\d{2}\.\d{2}\b/)?.[0] ?? null;
}

/** @param {string|null|undefined} duration */
function extractStudyMode(duration) {
  const value = toText(duration);
  if (!value) return '';
  if (value.includes('Очно-заочная')) return 'Очно-заочная';
  if (value.includes('Заочная')) return 'Заочная';
  if (value.includes('Очная')) return 'Очная';
  return value;
}

/** @param {unknown} exam */
function examTitle(exam) {
  if (typeof exam === 'string') return exam;
  if (!exam || typeof exam !== 'object') return '';
  const min = exam.minPoints ?? exam.minPoint;
  const suffix = min ? ` от ${min}` : '';
  return `${exam.title ?? ''}${suffix}`.trim();
}

/** @param {unknown} exam */
function normalizeExam(exam) {
  if (typeof exam === 'string') {
    return { title: exam, minPoints: 0, sort: 0, examKind: '' };
  }

  if (!exam || typeof exam !== 'object') {
    return { title: '', minPoints: 0, sort: 0, examKind: '' };
  }

  return {
    title: toText(exam.title),
    minPoints: Number(exam.minPoints ?? exam.minPoint ?? 0),
    sort: Number(exam.sort ?? 0),
    examKind: toText(exam.examKind),
  };
}

/**
 * @typedef {{ value: string, variant: string }} Tag
 * @typedef {{ title: string, value: string }} PropertyRow
 * @typedef {{ id: number, value: string, minScore?: number }} SubjectItem
 * @typedef {{ subject_id: number, points: number }} SubjectPayload
 * @typedef {{
 *   id: number,
 *   cardId?: number,
 *   faculty: string,
 *   facultyName: string,
 *   title: string,
 *   tags: Tag[],
 *   exams: string,
 *   properties: { budgetPlaces: string, passingScore: string, studyMode: string },
 *   allProperties: PropertyRow[],
 *   background?: string|null,
 *   partners?: { title: string, image: string|null }[]
 * }} Speciality
 * @typedef {{ subjects: {id:number,title:string,points:number}[], specialities: Speciality[] }} CalculatorResult
 */

/** @param {any} item */
export function normalizeSpeciality(item) {
  const source = unwrapData(item);
  const title = toText(source?.title);
  const code = extractProgramCode(title);
  const studyMode = source?.properties?.studyMode ?? extractStudyMode(source?.durationStudy);
  const exams = Array.isArray(source?.exams)
    ? source.exams.map(examTitle).filter(Boolean).join(', ')
    : toText(source?.exams);
  const examList = Array.isArray(source?.exams)
    ? source.exams.map(normalizeExam).filter(exam => exam.title)
    : [];
  const facultyId = source?.facultyId ?? source?.unitId ?? source?.faculty ?? 'unknown';
  const tags = Array.isArray(source?.tags) && source.tags.length
    ? source.tags
    : [
        code ? { value: code, variant: 'red' } : null,
        source?.level ? { value: toText(source.level), variant: 'blue' } : null,
        studyMode ? { value: studyMode, variant: 'green' } : null,
      ].filter(Boolean);
  const allProperties = Array.isArray(source?.allProperties) && source.allProperties.length
    ? source.allProperties
    : [
        source?.durationStudy ? { title: 'Форма и срок обучения', value: toText(source.durationStudy) } : null,
        source?.budgetPlace !== undefined ? { title: 'Количество бюджетных мест', value: toText(source.budgetPlace) } : null,
        source?.offBudgetPlace !== undefined ? { title: 'Количество платных мест', value: toText(source.offBudgetPlace) } : null,
        source?.price ? { title: 'Стоимость платного обучения', value: toText(source.price) } : null,
        exams ? { title: 'Экзамены', value: exams } : null,
      ].filter(Boolean);

  return {
    ...source,
    id: Number(source?.id ?? source?.cardId ?? source?.specialityId ?? 0),
    cardId: source?.cardId,
    faculty: typeof source?.faculty === 'string' ? source.faculty : `unit_${facultyId}`,
    facultyName: toText(source?.facultyName ?? source?.unitName),
    title,
    tags,
    exams,
    examList,
    properties: {
      budgetPlaces: toText(source?.properties?.budgetPlaces ?? source?.budgetPlace ?? source?.budgetPlaces),
      passingScore: toText(source?.properties?.passingScore ?? source?.passingScore),
      studyMode,
    },
    allProperties,
    background: fixAssetUrl(source?.background),
    partners: Array.isArray(source?.partners)
      ? source.partners.map(partner => ({
          title: toText(partner.title),
          image: fixAssetUrl(partner.image),
        }))
      : [],
  };
}

/** @param {any} data */
function normalizeCalculatorResult(data) {
  const source = unwrapData(data);
  return {
    subjects: asList(source?.subjects).map(item => ({
      id: Number(item.id),
      title: toText(item.title ?? item.value),
      points: Number(item.points ?? 0),
    })),
    specialities: asList(source?.specialities).map(normalizeSpeciality),
  };
}

/** @param {any} data */
function normalizeFeedback(data, fallbackType) {
  const source = unwrapData(data);
  const info = asList(source?.info).map(item => ({
    ...item,
    id: item.feedbackId ?? item.id,
    name: item.cn ?? item.name,
    description: item.text ?? item.description,
    imageUrl: fixAssetUrl(item.imageUrl),
    videoUrl: fixAssetUrl(item.videoUrl),
    type: item.type ?? fallbackType,
  }));

  return { ...(source ?? {}), info };
}

/** @param {any} data */
function normalizeEvents(data) {
  const source = unwrapData(data);
  const normalizeEvent = event => ({
    ...event,
    images: asList(event?.images).map(fixAssetUrl).filter(Boolean),
  });

  return {
    university: asList(source?.university).map(normalizeEvent),
    faculties: asList(source?.faculties).map(faculty => ({
      ...faculty,
      events: asList(faculty?.events).map(normalizeEvent),
    })),
  };
}

/** @param {any[]} subjects */
function normalizeSubjects(subjects) {
  return subjects.map(item => ({
    id: Number(item.id ?? item.subjectId),
    value: toText(item.value ?? item.title),
    minScore: item.minScore ?? item.minPoint,
  })).filter(item => item.id && item.value);
}

/** @param {string} value */
function normalizeRu(value) {
  return toText(value)
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/c/g, 'с')
    .replace(/[^a-zа-я0-9/ ]+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** @param {string} examTitleValue @param {string} subjectTitle */
function examMatchesSubject(examTitleValue, subjectTitle) {
  const subject = normalizeRu(subjectTitle);
  if (!subject) return false;

  return normalizeRu(examTitleValue)
    .split('/')
    .map(item => item.trim())
    .some(exam => exam && (exam.includes(subject) || subject.includes(exam)));
}

/** @param {{ subject_id: number, points: number }[]} subjects */
function calculatorFormBody(subjects) {
  const params = new URLSearchParams();
  subjects.forEach((item, index) => {
    params.set(`subjects[${index}][subject_id]`, String(item.subject_id));
    params.set(`subjects[${index}][points]`, String(item.points));
  });
  return params;
}

/**
 * Builds calculator results locally from API speciality cards when the server
 * calculator endpoint returns a backend formatting error.
 * @param {{ subject_id: number, points: number }[]} subjects
 */
async function fetchCalculatorFallbackResults(subjects) {
  const [cards, apiSubjects] = await Promise.all([
    fetchSpecialityCards(),
    fetchCalculatorSubjects().catch(fetchSubjects),
  ]);
  const titleById = new Map(apiSubjects.map(subject => [Number(subject.id), subject.value]));
  const selected = subjects
    .map(item => ({
      id: Number(item.subject_id),
      title: titleById.get(Number(item.subject_id)) ?? '',
      points: Number(item.points),
    }))
    .filter(item => item.title && item.points > 0);

  const matches = cards.filter(card => {
    const examList = Array.isArray(card.examList) ? card.examList : [];
    if (!examList.length) return true;

    const groups = new Map();
    examList.forEach((exam, index) => {
      const key = exam.sort || index + 1;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(exam);
    });

    return [...groups.values()].every(group => (
      group.some(exam => (
        selected.some(subject => (
          examMatchesSubject(exam.title, subject.title) &&
          subject.points >= Number(exam.minPoints || 0)
        ))
      ))
    ));
  });

  return {
    subjects: selected.map(subject => ({
      id: subject.id,
      title: subject.title,
      points: subject.points,
    })),
    specialities: matches,
  };
}

// Auth

/** @param {{ username: string, password: string }} body */
export function login(body) {
  return request('/abiturient/auth/login', { method: 'POST', body });
}

/** @param {{ full_name:string, email:string, password:string, place:string, education:string }} body */
export function register(body) {
  return request('/abiturient/auth/registration', { method: 'POST', body });
}

/** @param {string} token */
export function logout(token) {
  return request('/abiturient/auth/logout', { method: 'DELETE', token });
}

// Profile

/** @param {string} token */
export function fetchProfile(token) {
  return request('/abiturient/profile/view', { token });
}

/** @param {{ old_password: string, new_password: string }} body @param {string} token */
export function changePassword(body, token) {
  return request('/abiturient/profile/change/password', { method: 'POST', body, token });
}

// Basket

/** @param {number} cardId @param {string} token */
export function addToBasket(cardId, token) {
  return request('/abiturient/baskets', { method: 'POST', body: { card_id: cardId }, token });
}

/** @param {string} token */
export async function fetchBasket(token) {
  const data = await request('/abiturient/baskets', { token });
  return asList(data).map(item => ({
    ...item,
    card: item.card ? normalizeSpeciality(item.card) : null,
  }));
}

/** @param {number} basketId @param {string} token */
export function removeFromBasket(basketId, token) {
  return request(`/abiturient/baskets/${basketId}`, { method: 'DELETE', token });
}

// Question

/** @param {{ email: string, title: string, text: string }} body */
export function sendQuestion(body) {
  return request('/question/send', { method: 'POST', body });
}

// Info

export async function fetchInfoStats() {
  const data = await request('/info/info');
  return asList(data).sort((a, b) => Number(a.sort ?? 0) - Number(b.sort ?? 0));
}

export async function fetchPages() {
  const data = await request('/info/pages');
  return asList(data);
}

export async function fetchCalendar() {
  const data = await request('/info/calendar');
  return asList(data);
}

export async function fetchEvents() {
  const data = await request('/info/events');
  return normalizeEvents(data);
}

export async function fetchAchievements() {
  const data = await request('/info/achievements');
  return asList(data);
}

export async function fetchSubjectsInfo() {
  const data = await request('/info/subject');
  return normalizeSubjects(asList(data));
}

// Feedback

export async function fetchFeedbackFilters() {
  const data = await request('/structure/feedback/filters');
  return asList(data);
}

/** @param {number|null} facultyId */
export async function fetchGraduateFeedback(facultyId = null) {
  const data = await request('/structure/feedback/graduate', { query: { facultyId } });
  return normalizeFeedback(data, 'Выпускник');
}

/** @param {number|null} facultyId */
export async function fetchStudentFeedback(facultyId = null) {
  const data = await request('/structure/feedback/student', { query: { facultyId } });
  return normalizeFeedback(data, 'Студент');
}

// Calculator

export async function fetchSubjects() {
  const data = await request('/calculator/subjects');
  return normalizeSubjects(asList(data));
}

export async function fetchCalculatorSubjects() {
  const [subjects, subjectInfo] = await Promise.allSettled([fetchSubjects(), fetchSubjectsInfo()]);
  if (subjects.status === 'rejected') throw subjects.reason;

  const minimums = subjectInfo.status === 'fulfilled' ? subjectInfo.value : [];
  const minById = new Map(minimums.map(item => [item.id, Number(item.minScore ?? 40)]));
  const minByName = new Map(minimums.map(item => [item.value.toLowerCase(), Number(item.minScore ?? 40)]));

  return subjects.value.map(item => ({
    ...item,
    minScore: minById.get(item.id) ?? minByName.get(item.value.toLowerCase()) ?? item.minScore ?? 40,
  }));
}

/** @param {{ subject_id: number, points: number }[]} subjects */
export async function fetchCalculatorResults(subjects) {
  try {
    const data = await request('/calculator/form', {
      method: 'POST',
      body: { subjects },
    });
    return normalizeCalculatorResult(data);
  } catch (jsonError) {
    try {
      const data = await request('/calculator/form', {
        method: 'POST',
        body: calculatorFormBody(subjects),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      });
      return normalizeCalculatorResult(data);
    } catch {
      try {
        return await fetchCalculatorFallbackResults(subjects);
      } catch {
        throw jsonError;
      }
    }
  }
}

// Structure

export async function fetchInfrastructure() {
  const data = await request('/structure/infrastructure');
  return asList(data).map(faculty => ({
    ...faculty,
    infrastructure: asList(faculty.infrastructure).map(item => ({
      ...item,
      images: asList(item.images).map(fixAssetUrl).filter(Boolean),
    })),
  }));
}

export async function fetchSpecialities() {
  const data = await request('/structure/specialities');
  return asList(data);
}

export async function fetchUnits() {
  const data = await request('/structure/units');
  return asList(data);
}

export async function fetchTeachers() {
  const data = await request('/structure/teachers');
  return asList(data).map(item => ({ ...item, image: fixAssetUrl(item.image) }));
}

export async function fetchUgs() {
  if (!ugsRequest) {
    ugsRequest = request('/structure/ugs')
      .then(data => asList(data).map(item => ({
        ...item,
        cards: asList(item.cards).map(normalizeSpeciality),
      })))
      .catch(error => {
        ugsRequest = null;
        throw error;
      });
  }

  return ugsRequest;
}

export async function fetchSpecialityCards() {
  if (!specialityCardsRequest) {
    specialityCardsRequest = request('/structure/specialities/cards')
      .then(data => asList(data).map(normalizeSpeciality))
      .catch(error => {
        specialityCardsRequest = null;
        throw error;
      });
  }

  return specialityCardsRequest;
}

/** @param {number} cardId */
export async function fetchSpecialityCard(cardId) {
  const data = await request(`/structure/specialities/cards/${cardId}`);
  return normalizeSpeciality(data);
}

const DIRECTION_ICONS = ['📚', '⚕️', '⚖️', '💻', '🌱', '🏗️', '🎨', '📊'];

export async function fetchEducationDirections(limit = 8) {
  const groups = await fetchUgs();
  return groups.slice(0, limit).map((group, index) => {
    const cards = asList(group.cards);
    const professions = cards
      .map(card => card.profile || card.title?.replace(extractProgramCode(card.title) ?? '', '').trim())
      .filter(Boolean)
      .slice(0, 3);

    return {
      id: group.ugsId ?? index,
      title: group.ugsName ?? `Направление ${index + 1}`,
      professions,
      count: cards.length ? `${cards.length}` : '',
      icon: DIRECTION_ICONS[index % DIRECTION_ICONS.length],
    };
  });
}

export async function fetchEducationFaculties(limit = 8) {
  const cards = await fetchSpecialityCards();
  const groups = new Map();

  for (const card of cards) {
    const id = card.facultyId ?? card.faculty ?? card.facultyName;
    const title = card.facultyName || `Подразделение ${groups.size + 1}`;
    if (!groups.has(id)) {
      groups.set(id, {
        id,
        title,
        cards: [],
        professions: [],
      });
    }

    const group = groups.get(id);
    group.cards.push(card);

    const profession = card.profile || card.title?.replace(extractProgramCode(card.title) ?? '', '').trim();
    if (profession && !group.professions.includes(profession)) {
      group.professions.push(profession);
    }
  }

  return [...groups.values()].slice(0, limit).map((group, index) => ({
    id: group.id ?? index,
    title: group.title,
    professions: group.professions.slice(0, 3),
    count: group.cards.length ? `${group.cards.length}` : '',
    icon: DIRECTION_ICONS[index % DIRECTION_ICONS.length],
  }));
}

export async function fetchPartners(limit = 8) {
  const cards = await fetchSpecialityCards();
  const seen = new Set();
  const partners = [];

  for (const card of cards) {
    for (const partner of asList(card.partners)) {
      if (!partner.title || seen.has(partner.title)) continue;
      seen.add(partner.title);
      partners.push(partner);
      if (partners.length >= limit) return partners;
    }
  }

  return partners;
}
