import cx from 'classnames';

import { Typography } from './Typography';

interface Props {
  title: string;
  className?: string;
}

export const Header = ({ title, className }: Props) => (
  <Typography
    variant="heading-5"
    className={cx('text-white lg:w-1/4 lg:text-center', className)}
  >
    {title}
  </Typography>
);
