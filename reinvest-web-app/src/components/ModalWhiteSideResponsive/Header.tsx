import * as Dialog from '@radix-ui/react-dialog';
import placeholderImage from 'assets/images/profile-picture-placeholder.png';
import { Avatar } from 'components/Avatar';
import { Typography } from 'components/Typography';
import { AccountOverview } from 'reinvest-app-common/src/types/graphql';

interface Props {
  activeAccount: AccountOverview;
  title: string;
}

export const Header = ({ title, activeAccount }: Props) => (
  <header className="flex items-center gap-8 px-24 md:items-start md:p-44">
    <div className="md:hidden">
      <Avatar
        src={activeAccount.avatar?.url || placeholderImage}
        alt={activeAccount.avatar?.initials || ''}
        isSizeFixed
        fixedSize="xs"
      />
    </div>

    <Dialog.Title
      asChild
      className="hidden md:flex"
    >
      <Typography variant="h3">{title}</Typography>
    </Dialog.Title>
  </header>
);
