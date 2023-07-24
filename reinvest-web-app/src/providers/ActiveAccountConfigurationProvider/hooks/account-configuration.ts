import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useGetAccountConfiguration } from 'reinvest-app-common/src/services/queries/getAccountConfiguration';
import { AccountConfiguration } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Return {
  activeAccountConfiguration: AccountConfiguration | null;
  activeAccountConfigurationMeta: QueryMeta;
}

export function useAccountConfiguration(): Return {
  const { activeAccount } = useActiveAccount();
  const { data, ...activeAccountConfigurationMeta } = useGetAccountConfiguration(getApiClient, {
    accountId: activeAccount?.id || '',
    config: { enabled: !!activeAccount?.id },
  });

  return { activeAccountConfiguration: data ?? null, activeAccountConfigurationMeta };
}
