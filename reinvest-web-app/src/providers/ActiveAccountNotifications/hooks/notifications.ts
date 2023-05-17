import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useGetNotDismissedNotifications } from 'reinvest-app-common/src/services/queries/getNotDimissedNotifications';
import { Maybe, Notification } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Return {
  meta: QueryMeta;
  notifications: Maybe<Notification>[];
}

export function useNotifications(): Return {
  const { activeAccount } = useActiveAccount();
  const { data, isLoading, isSuccess, refetch } = useGetNotDismissedNotifications(getApiClient, {
    accountId: activeAccount?.id || '',
    config: { enabled: !!activeAccount?.id },
  });
  const meta: QueryMeta = { isLoading, isSuccess, refetch };

  return { notifications: data || [], meta };
}
