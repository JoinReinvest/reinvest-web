import { useGetDividend } from 'reinvest-app-common/src/services/queries/getDividend';
import { Dividend } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Params {
  dividendId: string | null;
  isEnabled?: boolean;
}

interface Returns {
  dividend: Dividend | null;
  dividendMeta: QueryMeta;
}

export function useDividend({ dividendId, isEnabled = true }: Params): Returns {
  const { data, ...dividendMeta } = useGetDividend(getApiClient, {
    dividendId: dividendId || '',
    config: { enabled: !!dividendId && isEnabled },
  });

  return { dividend: data ?? null, dividendMeta };
}
