import { Dialog as PrimitiveDialog, DialogClose, DialogProps as DialogPropsPrimitive } from '@hookooekoo/ui-dialog';
import { IconClose } from 'assets/icons/IconClose';

export const BlackModalDialog = ({ children, isOpen, onOpenChange }: DialogPropsPrimitive) => {
  return (
    <PrimitiveDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bg-black-02 flex h-full w-full flex-col justify-between overflow-x-auto p-24 text-white lg:p-72"
    >
      <>
        <DialogClose>
          <IconClose className="ml-auto mb-48" />
        </DialogClose>
        <div className="max-w-720 h-screen w-full overflow-hidden overflow-y-auto">{children}</div>
      </>
    </PrimitiveDialog>
  );
};
