import { useMarkNotificationAsRead } from 'reinvest-app-common/src/services/queries/markNotificationAsRead';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';

interface Return {
  markAsRead: (params: { notificationId: string }) => Promise<boolean>;
  markAsReadMeta: MutationMeta;
}

export function useMarkAsRead(): Return {
  const { mutateAsync, ...markAsReadMeta } = useMarkNotificationAsRead(getApiClient);

  const markAsRead: Return['markAsRead'] = async ({ notificationId }) => {
    const result = await mutateAsync({ notificationId });

    return result;
  };

  return { markAsRead, markAsReadMeta };
}
