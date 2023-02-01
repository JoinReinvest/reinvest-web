import { IconAlert } from 'assets/icons/IconAlert';

import { NotificationProps } from './interfaces';
import { NotificationIcon } from './NotificationIcon';

interface Props extends Pick<NotificationProps, 'title'> {
  isOpen: boolean;
}

export const NotificationHeader = ({ isOpen, title }: Props) => (
  <div className="py-16 px-24 flex justify-between items-center gap-x-16 bg-green-frost-solid">
    <div className="h-[42px] w-[42px] bg-white flex justify-center items-center rounded-full">
      <IconAlert />
    </div>

    <h4 className="grow text-xl font-extended-regular tracking-tighter">{title}</h4>

    <NotificationIcon isOpen={isOpen} />
  </div>
);
