import { signal, computed } from '@preact/signals';
import { MOCK_SUBJECTS, MIN_SCORES } from '@/shared/api/mockData';

/**
 * @typedef {{ id: number, value: string, minScore: number }} Subject
 * @typedef {{ subjectId: number, points: number | null }} ScoreEntry
 */

/** @type {import('@preact/signals').Signal<Subject[]>} */
export const subjectsSignal = signal(
  MOCK_SUBJECTS.map(s => ({ ...s, minScore: MIN_SCORES[s.id] ?? 40 }))
);

/** @type {import('@preact/signals').Signal<Record<number, number | null>>} */
export const scoresSignal = signal({});

/** @type {import('@preact/signals').Signal<number>} */
export const extraPointsSignal = signal(0);

export const totalScoreSignal = computed(() => {
  const scores = scoresSignal.value;
  const base = Object.values(scores).reduce((sum, v) => sum + (v ?? 0), 0);
  return base + extraPointsSignal.value;
});

/**
 * @param {number} subjectId
 * @param {number | null} points
 */
export function setScore(subjectId, points) {
  scoresSignal.value = { ...scoresSignal.value, [subjectId]: points };
}

/** @param {number} points */
export function setExtraPoints(points) {
  extraPointsSignal.value = points;
}

/**
 * Returns subjects with entered (non-null) scores formatted for API
 * @returns {{ subject_id: number, points: number }[]}
 */
export function getPayload() {
  const scores = scoresSignal.value;
  return Object.entries(scores)
    .filter(([, v]) => v !== null && v > 0)
    .map(([id, points]) => ({ subject_id: Number(id), points: Number(points) }));
}
