/** @typedef {{ subject_id: number, points: number }} SubjectPayload */
/** @typedef {{ id: number, value: string }} SubjectItem */
/** @typedef {{ id: number, faculty: string, facultyName: string, title: string, tags: {value:string,variant:string}[], exams: string, properties: { budgetPlaces: string, passingScore: string, studyMode: string }, allProperties: {title:string,value:string}[] }} Speciality */
/** @typedef {{ subjects: {id:number,title:string,points:number}[], specialities: Speciality[] }} CalculatorResult */

const BASE_URL = 'https://promo-prk.marsu.ru/promo-prk/web/api/calculator';

/**
 * Fetches the list of USE subjects
 * @returns {Promise<SubjectItem[]>}
 */
export async function fetchSubjects() {
  const res = await fetch(`${BASE_URL}/subjects`);
  if (!res.ok) throw new Error(`Ошибка загрузки предметов: ${res.status}`);
  return res.json();
}

/**
 * Submits subject scores to get matching specialities
 * @param {SubjectPayload[]} subjects
 * @returns {Promise<CalculatorResult>}
 */
export async function fetchCalculatorResults(subjects) {
  const res = await fetch(`${BASE_URL}/form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subjects }),
  });
  if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
  return res.json();
}
