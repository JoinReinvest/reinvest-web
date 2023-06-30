import { useGetPropertyDetails } from 'reinvest-app-common/src/services/queries/getPortfolioDetails';
import { PortfolioDetails } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Returns {
  portfolio: PortfolioDetails | null;
  portfolioMeta: QueryMeta;
}

export function usePortfolioDetails(): Returns {
  const { data, ...portfolioMeta } = useGetPropertyDetails(getApiClient);

  return { portfolio: data ?? null, portfolioMeta };
}
