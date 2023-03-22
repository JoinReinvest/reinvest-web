import cx from 'classnames';
import { HTMLAttributes, PropsWithChildren } from 'react';

type PrimitiveProps = Pick<HTMLAttributes<HTMLFormElement>, 'className' | 'onSubmit'>;
interface Props extends PrimitiveProps, PropsWithChildren {}

export const Form = ({ onSubmit, children, className }: Props) => (
  <form
    onSubmit={onSubmit}
    className={cx('relative h-full grid grid-rows-[1fr_auto] gap-16 justify-between', className)}
  >
    {children}
  </form>
);
