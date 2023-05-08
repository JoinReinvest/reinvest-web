import * as Dialog from '@radix-ui/react-dialog';
import placeholderImage from 'assets/images/profile-picture-placeholder.png';
import { Avatar } from 'components/Avatar';
import { Typography } from 'components/Typography';
import { AccountOverview } from 'reinvest-app-common/src/types/graphql';

interface Props {
  activeAccount: AccountOverview;
  title: string;
}

export const ActiveAccountTitle = ({ title, activeAccount }: Props) => (
  <div className="flex items-center gap-8 px-24 md:px-44 md:pt-44">
    <Avatar
      src={activeAccount.avatar?.url || placeholderImage}
      alt={activeAccount.avatar?.initials || ''}
      isSizeFixed
      fixedSize="xs"
    />

    <Dialog.Title>
      <Typography variant="h3">{title}</Typography>
    </Dialog.Title>
  </div>
);
