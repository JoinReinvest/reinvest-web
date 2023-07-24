import { Separator } from '@radix-ui/react-separator';
import cx from 'classnames';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  addPaddingBottom?: boolean;
  hideSeparator?: boolean;
}

export function Content({ addPaddingBottom, hideSeparator, children }: Props) {
  const contentClassName = cx('h-full overflow-y-auto px-24 md:px-44', { 'pb-24': !!addPaddingBottom });

  return (
    <div className="h-full overflow-y-hidden">
      {!hideSeparator && <Separator className="h-1 w-full bg-gray-04 md:h-0" />}

      <main className={contentClassName}>{children}</main>
    </div>
  );
}
