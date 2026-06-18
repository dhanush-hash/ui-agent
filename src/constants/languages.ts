import type { Language } from '@/types';

/**
 * Languages available in the Language Management filter. `code` matches the API
 * `languageCode` query parameter and the keys of `AssetResponseDTO.translations`.
 */
export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English (EN - US)', flag: '🇺🇸' },
  { code: 'fr', label: 'French (FR - FR)', flag: '🇫🇷' },
  { code: 'es', label: 'Spanish (ES - ES)', flag: '🇪🇸' },
  { code: 'de', label: 'German (DE - DE)', flag: '🇩🇪' },
];

export const DEFAULT_LANGUAGE = LANGUAGES[0];
