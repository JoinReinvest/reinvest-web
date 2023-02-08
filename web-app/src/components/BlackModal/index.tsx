import { Dialog } from '@hookooekoo/ui-dialog';
import { ReactNode } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

export interface Props {
  children: ReactNode;
  isOpen: boolean;
  onOpenChange?: (state: boolean) => void;
}

export const BlackModal = ({ isOpen = false, onOpenChange, children }: Props) => (
  <Dialog
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    className="modal-fullscreen"
  >
    <div className="flex h-full w-full flex-col items-center justify-between gap-40 overflow-y-hidden py-40 px-20 text-white">
      <Header />
      <div className="mx-auto w-full overflow-x-auto lg:max-w-330">{children}</div>
      <Footer />
    </div>
  </Dialog>
);
