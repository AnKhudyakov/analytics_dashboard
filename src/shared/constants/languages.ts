export const LANGUAGES = [
  { code: 'en', label: 'En' },
  { code: 'ru', label: 'Ru' },
  { code: 'fr', label: 'Fr' },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]['code'];
