import { IconArrowDown } from 'assets/icons/IconArrowDown';
import { IconArrowUp } from 'assets/icons/IconArrowUp';

interface NotificationIconProps {
  isExpanded: boolean;
}

export const NotificationIcon = ({ isExpanded }: NotificationIconProps) => <>{isExpanded ? <IconArrowUp /> : <IconArrowDown />}</>;
