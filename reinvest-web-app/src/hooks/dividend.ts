import { useGetDividend } from 'reinvest-app-common/src/services/queries/getDividend';
import { Dividend } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Params {
  dividendId: string | null;
}

interface Returns {
  dividend: Dividend | null;
  meta: QueryMeta;
}

export function useDividend({ dividendId }: Params): Returns {
  const { data, ...meta } = useGetDividend(getApiClient, {
    dividendId: dividendId || '',
    config: { enabled: !!dividendId },
  });

  return { dividend: data ?? null, meta };
}
