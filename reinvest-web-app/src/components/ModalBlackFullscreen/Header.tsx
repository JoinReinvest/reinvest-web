import { DialogClose } from '@hookooekoo/ui-dialog';
import { IconArrowLeft } from 'assets/icons/IconArrowLeft';
import { Logo } from 'assets/Logo';

interface Props {
  isBackButtonEnabled?: boolean;
}

export const Header = ({ isBackButtonEnabled }: Props) => (
  <header className="black-modal-header relative flex h-32 w-full items-center justify-center px-20 lg:h-48">
    <DialogClose>{isBackButtonEnabled ? <IconArrowLeft className="stroke-white" /> : null}</DialogClose>

    <Logo className="fill-white" />
  </header>
);
