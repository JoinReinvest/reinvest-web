import { DialogClose } from '@hookooekoo/ui-dialog';
import { IconArrowLeft } from 'assets/icons/IconArrowLeft';
import { Logo } from 'assets/Logo';

export const Header = () => (
  <header className="black-modal-header relative flex w-full items-center justify-center">
    <DialogClose>
      <IconArrowLeft className="stroke-white" />
    </DialogClose>
    <Logo className="fill-white" />
  </header>
);
