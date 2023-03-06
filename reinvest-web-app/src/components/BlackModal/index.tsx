import { Dialog, DialogProps } from '@hookooekoo/ui-dialog';
import { PropsWithChildren } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

export interface Props extends PrimitiveProps, PropsWithChildren {}

type PrimitiveProps = Pick<DialogProps, 'isOpen' | 'onOpenChange'>;

export const BlackModal = ({ isOpen = false, onOpenChange, children }: Props) => {
  const onEscapeKeyDown: DialogProps['onEscapeKeyDown'] = event => {
    event.preventDefault();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="black-modal"
      onEscapeKeyDown={onEscapeKeyDown}
    >
      <div className="flex h-full w-full flex-col items-center justify-between gap-40 overflow-y-hidden py-40 px-20 text-white">
        <Header />
        <div className="mx-auto h-full w-full">{children}</div>
        <Footer />
      </div>
    </Dialog>
  );
};
