import { useQuery } from '@tanstack/react-query';
import type { Language, LanguageAsset } from '@/types';

/** Languages available in the filter. The active language drives the value column. */
export const LANGUAGES: Language[] = [
  { code: 'en-US', label: 'English (EN - US)', flag: '🇺🇸' },
  { code: 'fr-FR', label: 'French (FR - FR)', flag: '🇫🇷' },
  { code: 'es-ES', label: 'Spanish (ES - ES)', flag: '🇪🇸' },
  { code: 'de-DE', label: 'German (DE - DE)', flag: '🇩🇪' },
];

export const DEFAULT_LANGUAGE = LANGUAGES[0];

/** Seed rows mirroring the Figma design; expanded below into a paginated set. */
const SEED_ASSETS: Omit<LanguageAsset, 'id'>[] = [
  { name: 'Lead title', description: 'A prospect', locationsCount: 6, type: 'single', translatedValue: 'Lead', createdBy: 'Prakriti R.' },
  { name: 'ScanDocuments', description: 'To scan the selected documents', locationsCount: 35, type: 'single', translatedValue: 'try scanning the documents', createdBy: 'Harshad Kumar' },
  { name: 'CreateObject', description: 'To create a new object', locationsCount: 50, type: 'single', translatedValue: 'Object successfully created', createdBy: 'Jyoti Agarwal' },
  { name: 'GenderSelect', description: 'A dropdown to select gender', locationsCount: 78, type: 'multiple', translatedValue: 'Male', createdBy: 'Matthew Gomez' },
  { name: 'TransactionFailed', description: 'Asset with multiple keys', locationsCount: 3, type: 'multiple', translatedValue: 'Groupedasset', createdBy: 'Pranav Patel' },
  { name: 'NoMatches', description: 'To show the transaction failed', locationsCount: 27, type: 'single', translatedValue: 'Transaction failure', createdBy: 'Matthew Gomez' },
  { name: 'GroupedAsset', description: 'To indicate no matches were found', locationsCount: 80, type: 'multiple', translatedValue: 'No matches found', createdBy: 'Pranav Patel' },
];

const TOTAL_ASSETS = 62;

/** Builds a deterministic dataset large enough to exercise pagination. */
function buildMockAssets(): LanguageAsset[] {
  return Array.from({ length: TOTAL_ASSETS }, (_, index) => {
    const seed = SEED_ASSETS[index % SEED_ASSETS.length];
    const cycle = Math.floor(index / SEED_ASSETS.length);
    return {
      ...seed,
      id: `asset-${index + 1}`,
      name: cycle === 0 ? seed.name : `${seed.name} ${cycle + 1}`,
    };
  });
}

const MOCK_ASSETS = buildMockAssets();

/**
 * Stand-in for `GET /assets`. Replace `fetchLanguageAssets` with the real request
 * once wired — the query key and `LanguageAsset[]` return shape stay the same.
 */
async function fetchLanguageAssets(): Promise<LanguageAsset[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_ASSETS), 400);
  });
}

export const languageAssetsQueryKey = ['language-assets'] as const;

/** Loads the language assets list. Server state owned by TanStack Query. */
export function useLanguageAssets() {
  return useQuery({
    queryKey: languageAssetsQueryKey,
    queryFn: fetchLanguageAssets,
  });
}
