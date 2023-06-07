import { useMarkNotificationAsRead } from 'reinvest-app-common/src/services/queries/markNotificationAsRead';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta, QueryMeta } from 'types/queries';

interface Params {
  notificationsMeta: QueryMeta;
}

interface Return {
  markAsRead: (params: { notificationId: string }) => Promise<boolean>;
  markAsReadMeta: MutationMeta;
}

export function useMarkAsRead({ notificationsMeta }: Params): Return {
  const { mutateAsync, ...markAsReadMeta } = useMarkNotificationAsRead(getApiClient);

  const markAsRead: Return['markAsRead'] = async ({ notificationId }) => {
    const result = await mutateAsync({ notificationId });
    notificationsMeta.refetch();

    return result;
  };

  return { markAsRead, markAsReadMeta };
}
