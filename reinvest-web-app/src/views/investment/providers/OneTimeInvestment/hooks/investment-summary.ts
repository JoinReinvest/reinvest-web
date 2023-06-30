import { useGetInvestmentSummary } from 'reinvest-app-common/src/services/queries/getInvestmentSummary';
import { InvestmentSummary } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Params {
  investmentId: string | null;
  enabled?: boolean;
}

interface Returns {
  investmentSummary: InvestmentSummary | null;
  investmentSummaryMeta: QueryMeta;
}

export function useInvestmentSummary({ investmentId, enabled }: Params): Returns {
  const { data, ...investmentSummaryMeta } = useGetInvestmentSummary(getApiClient, {
    investmentId: investmentId ?? '',
    config: { enabled: !!investmentId && enabled },
  });

  return { investmentSummary: data ?? null, investmentSummaryMeta };
}
