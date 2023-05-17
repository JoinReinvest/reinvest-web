import { useGetAccountStats } from 'reinvest-app-common/src/services/queries/getAccountStats';
import { AccountOverview, AccountStats, Maybe } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Params {
  activeAccount: AccountOverview | null;
}

interface Return {
  activeAccountStats: Maybe<AccountStats>;
  activeAccountStatsMeta: QueryMeta;
}

export function useAccountStats({ activeAccount }: Params): Return {
  const accountId = activeAccount?.id || '';
  const { data: accountStats, isSuccess, isLoading, refetch } = useGetAccountStats(getApiClient, { accountId });
  const activeAccountStatsMeta: QueryMeta = { isLoading, isSuccess, refetch };

  return { activeAccountStats: accountStats || null, activeAccountStatsMeta };
}
