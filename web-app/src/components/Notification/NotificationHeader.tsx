import { IconAlert } from 'assets/icons/IconAlert';
import { Typography } from 'components/Typography';

import { NotificationProps } from './interfaces';
import { NotificationIcon } from './NotificationIcon';

interface Props extends Pick<NotificationProps, 'title'> {
  isOpen: boolean;
}

export const NotificationHeader = ({ isOpen, title }: Props) => (
  <div className="flex items-center justify-between gap-x-16 bg-green-frost-01 py-16 px-24">
    <div className="flex h42 w42 items-center justify-center rounded-full bg-white">
      <IconAlert />
    </div>
    
    <Typography variant='heading-5' className='grow'>{title}</Typography>
    <NotificationIcon isOpen={isOpen} />
  </div>
);
