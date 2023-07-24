import cx from 'classnames';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  useRowOnLgScreen?: boolean;
}

export const ButtonStack = ({ useRowOnLgScreen = false, children }: Props) => {
  const className = cx('flex w-full gap-16 flex-col', { 'flex-col lg:flex-row': !!useRowOnLgScreen });

  return <div className={className}>{children}</div>;
};
