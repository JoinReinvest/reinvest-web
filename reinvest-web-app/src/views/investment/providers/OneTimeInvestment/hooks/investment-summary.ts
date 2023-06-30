import { useGetInvestmentSummary } from 'reinvest-app-common/src/services/queries/getInvestmentSummary';
import { InvestmentSummary } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Params {
  investmentId: string | null;
}

interface Returns {
  investmentSummary: InvestmentSummary | null;
  investmentSummaryMeta: QueryMeta;
}

export function useInvestmentSummary({ investmentId }: Params): Returns {
  const { data, ...investmentSummaryMeta } = useGetInvestmentSummary(getApiClient, { investmentId: investmentId ?? '', config: { enabled: !!investmentId } });

  return { investmentSummary: data ?? null, investmentSummaryMeta };
}
