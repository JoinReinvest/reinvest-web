import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo } from 'react';
import { useGetAccountActivity } from 'reinvest-app-common/src/services/queries/getAccountActivity';
import { AccountActivity, Maybe } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { InfiniteQueryMeta } from 'types/queries';

interface Returns {
  accountActivities: Maybe<AccountActivity>[];
  accountActivityMeta: InfiniteQueryMeta;
}

export function useAccountActivity(): Returns {
  const { activeAccount } = useActiveAccount();
  const { data, ...accountActivityMeta } = useGetAccountActivity(getApiClient, {
    accountId: activeAccount?.id || '',
    config: { enabled: !!activeAccount?.id },
  });
  const accountActivities = useMemo(() => data?.pages.map(page => page).flat() || [], [data]);

  return { accountActivities, accountActivityMeta };
}
