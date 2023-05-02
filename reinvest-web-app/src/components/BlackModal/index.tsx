import { Dialog, DialogProps } from '@hookooekoo/ui-dialog';
import { Footer } from 'components/ModalElements/Footer';
import { ProgressBar } from 'components/ProgressBar';
import { PropsWithChildren, useRef } from 'react';

import { Header } from './Header';

export interface Props extends PrimitiveProps, PropsWithChildren {
  progressBarValue?: number;
}

type PrimitiveProps = Pick<DialogProps, 'isOpen' | 'onOpenChange'>;

export const BlackModal = ({ isOpen = false, onOpenChange, progressBarValue, children }: Props) => {
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const willShowProgressBar = progressBarValue !== undefined;

  contentContainerRef.current?.scrollTo({ top: 0 });

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
      <div className="flex h-full w-full flex-col items-center justify-between gap-24 overflow-y-hidden py-40 text-white lg:py-60">
        <Header />

        {willShowProgressBar && (
          <div className="w-full md:px-20">
            <ProgressBar value={progressBarValue} />
          </div>
        )}

        <div
          ref={contentContainerRef}
          className="flex h-full w-full flex-col items-center justify-between gap-24 overflow-y-auto px-20"
        >
          <div className="mx-auto mt-24 w-full max-w-330 grow lg:mt-0">{children}</div>

          <Footer />
        </div>
      </div>
    </Dialog>
  );
};
