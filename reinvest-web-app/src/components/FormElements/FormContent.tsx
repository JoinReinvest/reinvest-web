import cx from 'classnames';
import { HTMLAttributes, PropsWithChildren } from 'react';

type PrimitiveProps = Pick<HTMLAttributes<HTMLDivElement>, 'className'>;
interface Props extends PrimitiveProps, PropsWithChildren {
  useFixedGap?: boolean;
  willLeaveContentOnTop?: boolean;
}

export const FormContent = ({ className, useFixedGap = false, willLeaveContentOnTop = false, children }: Props) => (
  <div className={cx('flex flex-col', { 'gap-60 lg:gap-16': !useFixedGap, 'gap-16': useFixedGap, 'lg:justify-center': !willLeaveContentOnTop }, className)}>
    {children}
  </div>
);
