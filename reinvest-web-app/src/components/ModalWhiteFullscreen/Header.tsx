import * as Dialog from '@radix-ui/react-dialog';
import { IconArrowLeft } from 'assets/icons/IconArrowLeft';
import { Logo } from 'assets/Logo';

export const Header = () => (
  <header className="white-modal-header relative hidden h-32 w-full items-center justify-center px-60 pt-60 md:flex lg:h-48">
    <Dialog.Close>
      <IconArrowLeft className="stroke-black-01" />
    </Dialog.Close>

    <Logo className="fill-black-01" />
  </header>
);
