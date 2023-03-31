import cx from 'classnames';
import { HTMLAttributes, PropsWithChildren } from 'react';

type PrimitiveProps = Pick<HTMLAttributes<HTMLDivElement>, 'className'>;
interface Props extends PrimitiveProps, PropsWithChildren {}

export const BlackModalContent = ({ className, children }: Props) => (
  <div className={cx('relative h-full w-full grid grid-rows-[1fr_auto] grid-cols-1 gap-16 justify-between', className)}>{children}</div>
);
