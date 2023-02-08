import { IconX } from 'assets/icons/IconX';
import cx from 'classnames';

interface Props {
  className?: string;
}

export const CircleFailure = ({ className }: Props) => (
  <div className={cx('grid h-96 w-96 place-items-center rounded-full border border-white', className)}>
    <IconX />
  </div>
);
