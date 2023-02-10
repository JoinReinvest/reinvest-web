import { Dialog as PrimitiveDialog, DialogClose, DialogProps as DialogPropsPrimitive } from '@hookooekoo/ui-dialog';
import { IconClose } from 'assets/icons/IconClose';

export const BlackModalDialog = ({ children, isOpen, onOpenChange }: DialogPropsPrimitive) => {
  return (
    <PrimitiveDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <>
        <DialogClose>
          <IconClose />
        </DialogClose>
        <div className="max-w-720 h-screen w-full overflow-hidden overflow-y-auto">{children}</div>
      </>
    </PrimitiveDialog>
  );
};
