import { useQuery } from '@tanstack/react-query';
import type { Designation } from '@/types';

/**
 * Stand-in for the designations API. Replace `fetchDesignations` with a real
 * request once the endpoint exists — the query key and return shape stay the same.
 */
const MOCK_DESIGNATIONS: Designation[] = [
  { id: 'lvl-1', level: 1, label: 'CEO', variant: 'default' },
  { id: 'lvl-2', level: 2, label: 'CFO', variant: 'default' },
  { id: 'lvl-3', level: 3, label: 'Senior consultant', variant: 'active' },
];

async function fetchDesignations(): Promise<Designation[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_DESIGNATIONS), 400);
  });
}

export const designationsQueryKey = ['designations'] as const;

/** Loads the designation hierarchy. Server state owned by TanStack Query. */
export function useDesignations() {
  return useQuery({
    queryKey: designationsQueryKey,
    queryFn: fetchDesignations,
  });
}
