import * as Dialog from '@radix-ui/react-dialog';
import { IconClose } from 'assets/icons/IconClose';
import placeholderImage from 'assets/images/profile-picture-placeholder.png';
import { Logo } from 'assets/Logo';
import { Avatar } from 'components/Avatar';
import { useActiveAccount } from 'providers/ActiveAccountProvider';

interface Props {
  hideLogoOnMobile?: boolean;
}

export function HeaderMobile({ hideLogoOnMobile = false }: Props) {
  const { activeAccount } = useActiveAccount();

  return (
    <header className="flex items-center justify-between px-24 pb-22 pt-12 text-black-01 md:hidden md:px-44">
      <Dialog.Close>
        <IconClose />
      </Dialog.Close>

      {!hideLogoOnMobile && <Logo className="fill-black-01" />}

      <Avatar
        src={activeAccount?.avatar?.url || placeholderImage}
        alt={activeAccount?.avatar?.initials || ''}
        isSizeFixed
        fixedSize="xs"
      />
    </header>
  );
}
