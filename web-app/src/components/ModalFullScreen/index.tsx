import { Dialog } from '@hookooekoo/ui-dialog';
import { ModalFullScreenHeader } from './components/ModalFullScreenHeader';
import { ModalFullScreenFooter } from './components/ModalFullScreenFooter';

import { ReactNode } from 'react';

export interface Props {
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
  children: ReactNode;
}

export const ModalFullscreen = ({ isOpen = false, onOpenChange, children }: Props) => (
  <Dialog
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    className="modal-fullscreen"
  >
    <div className="h-full w-full grid grid-rows-[auto_1fr_auto] overflow-y-hidden">
      <ModalFullScreenHeader />

      <div className="md:max-w-332 md:mx-auto md:pt-180 pt-24 px-24 overflow-auto">{children}</div>

      <ModalFullScreenFooter />
    </div>
  </Dialog>
);
