import { Dialog } from '@hookooekoo/ui-dialog';
import { Props } from './interfaces';
import { ModalFullScreenHeader } from './components/ModalFullScreenHeader';
import { ModalFullScreenFooter } from './components/ModalFullScreenFooter';

export const ModalFullscreen = ({ isOpen = false, onOpenChange, children, buttonProps }: Props) => (
  <Dialog
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    className="modal-fullscreen"
  >
    <div className="h-full w-full grid grid-rows-[auto_1fr_auto] overflow-y-hidden">
      <ModalFullScreenHeader />

      <div className="md:max-w-332 md:mx-auto p-24 overflow-auto">{children}</div>

      <ModalFullScreenFooter buttonProps={buttonProps} />
    </div>
  </Dialog>
);
