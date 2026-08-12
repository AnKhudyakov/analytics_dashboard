import { jwtDecode } from 'jwt-decode';

import { setAccessToken } from 'shared/api';

const TOKEN_KEY = 'token';

export interface StoredSession {
  token: string | null;
  expiresAt: number | null;
}

const EMPTY_SESSION: StoredSession = { token: null, expiresAt: null };

export const readTokenExpiry = (token: string): number | null => {
  try {
    const { exp } = jwtDecode(token);
    return exp ? exp * 1000 : null;
  } catch {
    return null;
  }
};

export const persistToken = (token: string, remember: boolean): void => {
  clearPersistedToken();
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, token);
  setAccessToken(token);
};

export const clearPersistedToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  setAccessToken(null);
};

export const readPersistedSession = (): StoredSession => {
  const token =
    sessionStorage.getItem(TOKEN_KEY) ?? localStorage.getItem(TOKEN_KEY);
  if (!token) return EMPTY_SESSION;

  const expiresAt = readTokenExpiry(token);
  if (!expiresAt || expiresAt <= Date.now()) {
    clearPersistedToken();
    return EMPTY_SESSION;
  }

  setAccessToken(token);
  return { token, expiresAt };
};
