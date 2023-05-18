import { useMarkNotificationAsRead } from 'reinvest-app-common/src/services/queries/markNotificationAsRead';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';

import { State } from '../interfaces';

interface Return {
  markAsRead: State['markAsRead'];
  meta: MutationMeta;
}

export function useMarkAsRead(): Return {
  const { mutateAsync, isLoading, isSuccess, error, reset } = useMarkNotificationAsRead(getApiClient);
  const meta: MutationMeta = { isLoading, isSuccess, error, reset };

  return { markAsRead: mutateAsync, meta };
}
