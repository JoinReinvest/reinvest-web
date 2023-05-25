import { useMarkAsRead } from './hooks/mark-as-read';
import { useNotificationsStats } from './hooks/notifications-stats';

export interface State extends UseMarkAsRead, UseNotifications {}

type UseMarkAsRead = ReturnType<typeof useMarkAsRead>;
type UseNotifications = ReturnType<typeof useNotificationsStats>;
