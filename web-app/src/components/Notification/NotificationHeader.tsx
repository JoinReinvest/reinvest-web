import { IconAlert } from 'assets/icons/IconAlert';

import { NotificationProps } from './interfaces';
import { NotificationIcon } from './NotificationIcon';

interface Props extends Pick<NotificationProps, 'title'> {
  isOpen: boolean;
}

export const NotificationHeader = ({ isOpen, title }: Props) => (
  <div className="flex items-center justify-between gap-x-16 bg-green-frost-solid py-16 px-24">
    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white">
      <IconAlert />
    </div>

    <h4 className="grow text-xl font-extended-regular tracking-tighter">{title}</h4>

    <NotificationIcon isOpen={isOpen} />
  </div>
);
