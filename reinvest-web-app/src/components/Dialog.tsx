import { Dialog as PrimitiveDialog, DialogClose, DialogProps as DialogPropsPrimitive } from '@hookooekoo/ui-dialog';
import { IconClose } from 'assets/icons/IconClose';
import cx from 'classnames';

interface Props extends DialogPropsPrimitive {
  color?: 'white' | 'black';
}

export const Dialog = ({ children, isOpen, onOpenChange, color = 'black' }: Props) => {
  const className = cx('flex h-full w-full flex-col justify-between overflow-x-auto p-24', {
    'bg-black-02 text-white': color === 'black',
    'bg-white text-black-01': color === 'white',
  });

  return (
    <PrimitiveDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className={className}
    >
      <>
        <DialogClose>
          <IconClose className="mb-48 ml-auto" />
        </DialogClose>

        <div className="h-screen w-full max-w-720 overflow-hidden overflow-y-auto md:mx-auto">{children}</div>
      </>
    </PrimitiveDialog>
  );
};
