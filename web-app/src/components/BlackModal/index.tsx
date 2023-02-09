import { Dialog } from '@hookooekoo/ui-dialog';
import { ReactNode } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

export interface Props {
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
}

export const BlackModal = ({ isOpen = false, onOpenChange, children }: Props) => (
  <Dialog
    isOpen={isOpen}
    onOpenChange={state => onOpenChange(state)}
    className="black-modal"
  >
    <div className="flex h-full w-full flex-col items-center justify-between gap-40 overflow-y-hidden py-40 px-20 text-white">
      <Header />
      <div className="max-w-330 mx-auto w-full overflow-x-auto">{children}</div>
      <Footer />
    </div>
  </Dialog>
);
