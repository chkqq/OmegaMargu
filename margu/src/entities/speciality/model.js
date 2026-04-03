import { signal, computed } from '@preact/signals';

/** @typedef {import('@/shared/api/calculator').Speciality} Speciality */

/** @type {import('@preact/signals').Signal<Speciality[]>} */
export const specialitiesSignal = signal([]);

/** @type {import('@preact/signals').Signal<'idle'|'loading'|'success'|'empty'|'error'>} */
export const statusSignal = signal('idle');

/** @type {import('@preact/signals').Signal<string|null>} */
export const errorSignal = signal(null);

/** Filter state */
export const filterSignal = signal({
  /** @type {string[]} */
  studyMode: [],
  /** @type {string[]} */
  admission: [],
  /** @type {string[]} */
  directions: [],
});

/** Grouped by faculty */
export const groupedSignal = computed(() => {
  const list = specialitiesSignal.value;
  const filter = filterSignal.value;

  const filtered = list.filter(s => {
    if (filter.studyMode.length && !filter.studyMode.includes(s.properties.studyMode)) return false;
    return true;
  });

  /** @type {Record<string, { name: string, items: Speciality[] }>} */
  const groups = {};
  for (const s of filtered) {
    if (!groups[s.faculty]) groups[s.faculty] = { name: s.facultyName, items: [] };
    groups[s.faculty].items.push(s);
  }
  return groups;
});

/** @param {Speciality[]} list */
export function setResults(list) {
  specialitiesSignal.value = list;
  statusSignal.value = list.length ? 'success' : 'empty';
}

/** @param {string} msg */
export function setError(msg) {
  errorSignal.value = msg;
  statusSignal.value = 'error';
}

export function setLoading() {
  statusSignal.value = 'loading';
  errorSignal.value = null;
}

/**
 * @param {Partial<typeof filterSignal.value>} patch
 */
export function updateFilter(patch) {
  filterSignal.value = { ...filterSignal.value, ...patch };
}
