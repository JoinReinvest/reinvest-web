import { Dialog as PrimitiveDialog, DialogClose, DialogProps as DialogPropsPrimitive } from '@hookooekoo/ui-dialog';
import { IconClose } from 'assets/icons/IconClose';

export const BlackModalDialog = ({ children, isOpen, onOpenChange }: DialogPropsPrimitive) => {
  return (
    <PrimitiveDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="flex h-full w-full flex-col justify-between overflow-x-auto bg-black-02 p-24 text-white"
    >
      <>
        <DialogClose>
          <IconClose className="ml-auto mb-48" />
        </DialogClose>
        <div className="h-screen w-full max-w-720 overflow-hidden overflow-y-auto md:mx-auto">{children}</div>
      </>
    </PrimitiveDialog>
  );
};
