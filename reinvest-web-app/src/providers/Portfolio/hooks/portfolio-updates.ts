import { useGetAllPortfolioUpdatesQuery } from 'reinvest-app-common/src/services/queries/get-all-portfolio-updates';
import { Maybe, PortfolioUpdate } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Returns {
  portfolioUpdates: Maybe<PortfolioUpdate>[];
  portfolioUpdatesMeta: QueryMeta;
}

export function usePortfolioUpdates(): Returns {
  const { data, ...portfolioUpdatesMeta } = useGetAllPortfolioUpdatesQuery(getApiClient);

  return { portfolioUpdates: data ?? [], portfolioUpdatesMeta };
}
