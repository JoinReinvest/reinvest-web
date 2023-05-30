import { useMarkNotificationAsRead } from 'reinvest-app-common/src/services/queries/markNotificationAsRead';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';

interface Return {
  markAsRead: (params: { notificationId: string }) => Promise<boolean>;
  markAsReadMeta: MutationMeta;
}

export function useMarkAsRead(): Return {
  const { mutateAsync: markAsRead, ...markAsReadMeta } = useMarkNotificationAsRead(getApiClient);

  return { markAsRead, markAsReadMeta };
}
