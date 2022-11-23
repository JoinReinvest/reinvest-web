import { IconArrowDown } from 'assets/icons/IconArrowDown';
import { IconArrowUp } from 'assets/icons/IconArrowUp';

interface Props {
  isOpen: boolean;
}

export const NotificationIcon = ({ isOpen }: Props) => <>{isOpen ? <IconArrowUp /> : <IconArrowDown />}</>;
