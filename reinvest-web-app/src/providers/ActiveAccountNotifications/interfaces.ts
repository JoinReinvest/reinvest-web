import { Maybe, Notification } from 'reinvest-app-common/src/types/graphql';
import { MutationMeta, QueryMeta } from 'types/queries';

export interface State {
  markAsRead: MarkAsRead;
  notifications: Maybe<Notification>[];
  markAsReadMeta?: MutationMeta;
  notificationsMeta?: QueryMeta;
}

type MarkAsRead = ({ notificationId }: { notificationId: string }) => Promise<boolean>;
