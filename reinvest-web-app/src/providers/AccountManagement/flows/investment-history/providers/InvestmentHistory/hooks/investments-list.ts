import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo } from 'react';
import { useListInvestments } from 'reinvest-app-common/src/services/queries/list-investments';
import { InvestmentOverview, Maybe } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { InfiniteQueryMeta } from 'types/queries';

interface Returns {
  investmentsList: Maybe<InvestmentOverview>[];
  investmentsListMeta: InfiniteQueryMeta;
}

export function useInvestmentsList(): Returns {
  const { activeAccount } = useActiveAccount();
  const { data, ...investmentsListMeta } = useListInvestments(getApiClient, { accountId: activeAccount?.id || '', config: { enabled: !!activeAccount?.id } });
  const investmentsList = useMemo(() => data?.pages.map(page => page).flat() || [], [data]);

  return { investmentsList, investmentsListMeta };
}
