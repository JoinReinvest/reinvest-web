import { useGetInvestmentSummary } from 'reinvest-app-common/src/services/queries/getInvestmentSummary';
import { InvestmentSummary, Maybe } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Params {
  investmentId: string | null;
  enabled?: boolean;
}

interface Returns {
  investment: Maybe<InvestmentSummary> | null;
  investmentMeta: QueryMeta;
}

export function useInvestmentSummary({ investmentId, enabled = true }: Params): Returns {
  const { data, ...investmentMeta } = useGetInvestmentSummary(getApiClient, {
    investmentId: investmentId || '',
    config: { enabled: !!investmentId && enabled },
  });

  return { investment: data ?? null, investmentMeta };
}
