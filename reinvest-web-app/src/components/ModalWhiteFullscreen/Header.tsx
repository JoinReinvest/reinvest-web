import * as Dialog from '@radix-ui/react-dialog';
import { IconArrowLeft } from 'assets/icons/IconArrowLeft';
import { Logo } from 'assets/Logo';

import { IconX } from '../../assets/icons/IconX';

interface Props {
  isBackButtonEnabled?: boolean;
}

export const Header = ({ isBackButtonEnabled }: Props) => {
  const iconStyles = 'stroke-black-01';

  return (
    <header className="white-modal-header relative hidden h-48 w-full items-center justify-center px-60 md:flex">
      <Dialog.Close>{isBackButtonEnabled ? <IconArrowLeft className={iconStyles} /> : <IconX className={iconStyles} />}</Dialog.Close>

      <Logo className="fill-black-01" />
    </header>
  );
};
