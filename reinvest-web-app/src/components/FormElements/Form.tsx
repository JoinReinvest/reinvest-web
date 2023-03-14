import cx from 'classnames';
import { HTMLAttributes, PropsWithChildren } from 'react';

type PrimitiveProps = Pick<HTMLAttributes<HTMLFormElement>, 'className' | 'onSubmit'>;
interface FormProps extends PrimitiveProps, PropsWithChildren {}

export const Form = ({ onSubmit, children, className }: FormProps) => (
  <form
    onSubmit={onSubmit}
    className={cx('relative flex h-full flex-col gap-24 lg:justify-center', className)}
  >
    {children}
  </form>
);
