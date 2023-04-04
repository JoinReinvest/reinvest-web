import { IconAlert } from 'assets/icons/IconAlert';
import { Typography } from 'components/Typography';

import { NotificationProps } from './interfaces';
import { NotificationIcon } from './NotificationIcon';

interface Props extends Pick<NotificationProps, 'title'> {
  isOpen: boolean;
}

export const NotificationHeader = ({ isOpen, title }: Props) => (
  <div className="flex items-center justify-between gap-x-16 bg-green-frost-01 px-24 py-16">
    <div className="h42 w42 flex items-center justify-center rounded-full bg-white">
      <IconAlert />
    </div>

    <Typography
      variant="h5"
      className="grow"
    >
      {title}
    </Typography>
    <NotificationIcon isOpen={isOpen} />
  </div>
);
