import * as Dialog from '@radix-ui/react-dialog';
import { IconClose } from 'assets/icons/IconClose';
import { Logo } from 'assets/Logo';
import { Avatar } from 'components/Avatar';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

interface Props {
  hideLogoOnMobile?: boolean;
}

export function HeaderMobile({ hideLogoOnMobile = false }: Props) {
  const { activeAccount } = useActiveAccount();
  const avatarInitials = activeAccount?.avatar?.initials;

  return (
    <header className="flex items-center justify-between px-24 pb-22 pt-12 text-black-01 md:hidden md:px-44">
      <Dialog.Close>
        <IconClose />
      </Dialog.Close>

      {!hideLogoOnMobile && <Logo className="fill-black-01" />}

      <Avatar
        src={activeAccount?.avatar?.url ?? undefined}
        label={avatarInitials ?? undefined}
        alt={avatarInitials ?? `${activeAccount?.label}'s profile picture`}
        accountType={activeAccount?.type || AccountType.Individual}
        isSizeFixed
        fixedSize="xs"
      />
    </header>
  );
}
