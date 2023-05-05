import { DialogClose } from '@hookooekoo/ui-dialog';
import { IconArrowLeft } from 'assets/icons/IconArrowLeft';
import { Logo } from 'assets/Logo';

export const Header = () => (
  <header className="black-modal-header relative flex h-32 w-full items-center justify-center px-20 lg:h-48">
    <DialogClose>
      <IconArrowLeft className="stroke-white" />
    </DialogClose>

    <Logo className="fill-white" />
  </header>
);
