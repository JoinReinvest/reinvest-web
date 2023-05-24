import { useMarkAsRead } from './hooks/mark-as-read';
import { useNotifications } from './hooks/notifications';

export interface State extends UseMarkAsRead, UseNotifications {}

type UseMarkAsRead = ReturnType<typeof useMarkAsRead>;
type UseNotifications = ReturnType<typeof useNotifications>;
