import { Dialog, DialogProps } from '@hookooekoo/ui-dialog';
import { ProgressBar } from 'components/ProgressBar';
import { PropsWithChildren } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

export interface Props extends PrimitiveProps, PropsWithChildren {
  progressBarValue?: number;
}

type PrimitiveProps = Pick<DialogProps, 'isOpen' | 'onOpenChange'>;

export const BlackModal = ({ isOpen = false, onOpenChange, progressBarValue, children }: Props) => {
  const willShowProgressBar = progressBarValue !== undefined;

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
      <div className="flex h-full w-full flex-col items-center justify-between gap-24 overflow-y-hidden py-40 px-20 text-white lg:py-60">
        <Header />

        {willShowProgressBar && <ProgressBar value={progressBarValue} />}

        <div className="mx-auto h-full w-full max-w-330 max-lg:pt-24">{children}</div>

        <Footer />
      </div>
    </Dialog>
  );
};
