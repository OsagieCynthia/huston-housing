'use client';

import { useQuery } from '@tanstack/react-query';
import { readHouston HousingState } from '@/lib/contracts/soroban-client';
import { getContractIds } from '@/lib/contracts/config';

export function useHouston HousingContractState() {
  const { huston-housing } = getContractIds();

  return useQuery({
    queryKey: ['huston-housing-contract-state', huston-housing],
    enabled: Boolean(huston-housing),
    queryFn: readHouston HousingState,
    staleTime: 120_000,
  });
}
