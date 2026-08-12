import { type Filters } from 'shared/api/types';

const toBase64 = (value: string): string => {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

const fromBase64 = (value: string): string => {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

export const serializeFilters = (filters: Filters): string =>
  toBase64(JSON.stringify(filters));

export const deserializeFilters = (value: string | null): Filters => {
  if (!value) return {};
  try {
    const parsed: unknown = JSON.parse(fromBase64(value));
    if (typeof parsed !== 'object' || parsed === null) return {};
    return parsed as Filters;
  } catch {
    return {};
  }
};

export const countActiveFilters = (filters: Filters): number =>
  Object.values(filters).filter((filter) => filter !== null).length;
