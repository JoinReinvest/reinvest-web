import cx from 'classnames';
import { HTMLAttributes, PropsWithChildren } from 'react';

type PrimitiveProps = Pick<HTMLAttributes<HTMLDivElement>, 'className'>;
interface Props extends PrimitiveProps, PropsWithChildren {}

export const FormContent = ({ className, children }: Props) => (
  <div className={cx('flex flex-col gap-60 lg:gap-16 lg:justify-center', className)}>{children}</div>
);
