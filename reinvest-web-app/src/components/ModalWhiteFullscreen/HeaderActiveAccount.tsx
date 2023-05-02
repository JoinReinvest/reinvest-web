import * as Dialog from '@radix-ui/react-dialog';
import { IconClose } from 'assets/icons/IconClose';
import placeholderImage from 'assets/images/profile-picture-placeholder.png';
import { Logo } from 'assets/Logo';
import { Avatar } from 'components/Avatar';
import { AccountOverview, Maybe } from 'reinvest-app-common/src/types/graphql';

interface Props {
  activeAccount: Maybe<AccountOverview>;
}

export const HeaderActiveAccount = ({ activeAccount }: Props) => (
  <header className="flex items-center justify-between px-24 pb-22 pt-12 text-black-01 md:hidden md:px-44">
    <Dialog.Close>
      <IconClose />
    </Dialog.Close>

    <Logo className="fill-black-01" />

    <Avatar
      src={activeAccount?.avatar?.url || placeholderImage}
      alt={activeAccount?.avatar?.initials || ''}
      isSizeFixed
      fixedSize="xs"
    />
  </header>
);
