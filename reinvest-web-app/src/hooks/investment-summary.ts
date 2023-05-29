import { useGetInvestmentSummary } from 'reinvest-app-common/src/services/queries/getInvestmentSummary';
import { InvestmentSummary, Maybe } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Params {
  investmentId: string | null;
}

interface Returns {
  investment: Maybe<InvestmentSummary> | null;
  investmentMeta: QueryMeta;
}

export function useInvestmentSummary({ investmentId }: Params): Returns {
  const { data, ...investmentMeta } = useGetInvestmentSummary(getApiClient, { investmentId: investmentId || '', config: { enabled: !!investmentId } });

  return { investment: data ?? null, investmentMeta };
}
