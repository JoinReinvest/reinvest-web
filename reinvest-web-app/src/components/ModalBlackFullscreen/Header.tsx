import { DialogClose } from '@hookooekoo/ui-dialog';
import { IconArrowLeft } from 'assets/icons/IconArrowLeft';
import { Logo } from 'assets/Logo';

import { IconX } from '../../assets/icons/IconX';

interface Props {
  isBackButtonEnabled?: boolean;
}

export const Header = ({ isBackButtonEnabled }: Props) => {
  const iconStyles = 'stroke-white';

  return (
    <header className="black-modal-header relative flex h-32 w-full items-center justify-center px-20 lg:h-48">
      <DialogClose>{isBackButtonEnabled ? <IconArrowLeft className={iconStyles} /> : <IconX className={iconStyles} />}</DialogClose>

      <Logo className="fill-white" />
    </header>
  );
};
