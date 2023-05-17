export interface Notification {
  date: string;
  description: string;
  hasBeenRead: boolean;
  id: string;
  title: string;
  isActionable?: boolean;
}
