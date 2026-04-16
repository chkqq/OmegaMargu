const BASE = 'https://promo-prk.marsu.ru/promo-prk/web/api';

/** @param {string} token */
function authHeaders(token) {
  return {
    'Content-Type': 'application/json',
    'Abiturient-Token': token ?? '',
  };
}

// ─── Auth ────────────────────────────────────────────────────────────────────

/**
 * @param {{ username: string, password: string }} body
 * @returns {Promise<{ token: string, expire: string }>}
 */
export async function login(body) {
  const res = await fetch(`${BASE}/abiturient/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

/**
 * @param {{ full_name:string, email:string, password:string, place:string, education:string }} body
 */
export async function register(body) {
  const res = await fetch(`${BASE}/abiturient/auth/registration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

/** @param {string} token */
export async function logout(token) {
  await fetch(`${BASE}/abiturient/auth/logout`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
}

// ─── Profile ─────────────────────────────────────────────────────────────────

/** @param {string} token */
export async function fetchProfile(token) {
  const res = await fetch(`${BASE}/abiturient/profile/view`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// ─── Question / Contact form ──────────────────────────────────────────────────

/**
 * @param {{ email: string, title: string, text: string }} body
 */
export async function sendQuestion(body) {
  const res = await fetch(`${BASE}/question/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// ─── Info ─────────────────────────────────────────────────────────────────────

export async function fetchInfoStats() {
  const res = await fetch(`${BASE}/info/info`);
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function fetchPages() {
  const res = await fetch(`${BASE}/info/pages`);
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function fetchEvents() {
  const res = await fetch(`${BASE}/info/events`);
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function fetchSubjectsInfo() {
  const res = await fetch(`${BASE}/info/subject`);
  if (!res.ok) throw await res.json();
  return res.json();
}

// ─── Feedback ─────────────────────────────────────────────────────────────────

/** @param {number|null} facultyId */
export async function fetchGraduateFeedback(facultyId = null) {
  const url = new URL(`${BASE}/structure/feedback/graduate`);
  if (facultyId) url.searchParams.set('facultyId', facultyId);
  const res = await fetch(url.toString());
  if (!res.ok) throw await res.json();
  return res.json();
}

/** @param {number|null} facultyId */
export async function fetchStudentFeedback(facultyId = null) {
  const url = new URL(`${BASE}/structure/feedback/student`);
  if (facultyId) url.searchParams.set('facultyId', facultyId);
  const res = await fetch(url.toString());
  if (!res.ok) throw await res.json();
  return res.json();
}

// ─── Calculator ───────────────────────────────────────────────────────────────

export async function fetchSubjects() {
  const res = await fetch(`${BASE}/calculator/subjects`);
  if (!res.ok) throw await res.json();
  return res.json();
}

/** @param {{ subject_id: number, points: number }[]} subjects */
export async function fetchCalculatorResults(subjects) {
  const res = await fetch(`${BASE}/calculator/form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subjects }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// ─── Structure / Specialities ─────────────────────────────────────────────────

export async function fetchSpecialityCards() {
  const res = await fetch(`${BASE}/structure/specialities/cards`);
  if (!res.ok) throw await res.json();
  return res.json();
}

/** @param {number} cardId */
export async function fetchSpecialityCard(cardId) {
  const res = await fetch(`${BASE}/structure/specialities/cards/${cardId}`);
  if (!res.ok) throw await res.json();
  return res.json();
}
