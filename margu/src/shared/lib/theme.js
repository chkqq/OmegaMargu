import { signal } from '@preact/signals';

const THEME_KEY = 'theme';
const saved = localStorage.getItem(THEME_KEY) ?? 'light';

/** @type {import('@preact/signals').Signal<'light'|'dark'>} */
export const themeSignal = signal(saved);

export function toggleTheme() {
  const next = themeSignal.value === 'light' ? 'dark' : 'light';
  themeSignal.value = next;
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

/** @param {'light'|'dark'} theme */
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

// Apply on load
applyTheme(saved);
