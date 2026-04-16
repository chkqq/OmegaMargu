import { signal, computed } from '@preact/signals';

const TOKEN_KEY = 'abiturient_token';

/** @type {import('@preact/signals').Signal<string|null>} */
export const tokenSignal = signal(localStorage.getItem(TOKEN_KEY));

export const isAuthSignal = computed(() => !!tokenSignal.value);

/** @param {string} token */
export function setToken(token) {
  tokenSignal.value = token;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  tokenSignal.value = null;
  localStorage.removeItem(TOKEN_KEY);
}
