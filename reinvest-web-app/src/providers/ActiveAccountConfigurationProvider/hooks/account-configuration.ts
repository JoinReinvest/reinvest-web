import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useGetAccountConfiguration } from 'reinvest-app-common/src/services/queries/getAccountConfiguration';
import { AccountConfiguration } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';

interface Return {
  activeAccountConfiguration: AccountConfiguration | null;
  refetchAccountConfiguration: () => void;
}

export function useAccountConfiguration(): Return {
  const { activeAccount } = useActiveAccount();
  const { data: accountConfiguration, refetch: refetchAccountConfiguration } = useGetAccountConfiguration(getApiClient, {
    accountId: activeAccount?.id || '',
    config: { queryKey: [activeAccount?.id], enabled: !!activeAccount?.id },
  });

  return { activeAccountConfiguration: accountConfiguration || null, refetchAccountConfiguration };
}
