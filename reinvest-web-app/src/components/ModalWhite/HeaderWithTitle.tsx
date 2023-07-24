import * as Dialog from '@radix-ui/react-dialog';
import cx from 'classnames';
import { Avatar } from 'components/Avatar';
import { Typography } from 'components/Typography';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

interface Props {
  title: string;
  hideAvatarNextToTitle?: boolean;
  hideHeaderOnMobile?: boolean;
  hideTitle?: boolean;
}

export function HeaderWithTitle({ title, hideHeaderOnMobile, hideAvatarNextToTitle, hideTitle }: Props) {
  const { activeAccount } = useActiveAccount();
  const className = cx('items-center gap-8 px-24 md:px-44 md:pt-44', { flex: !hideHeaderOnMobile, 'hidden md:flex': !!hideHeaderOnMobile });
  const avatarContainerClassName = cx({ hidden: !!hideAvatarNextToTitle });
  const avatarInitials = activeAccount?.avatar?.initials;

  return (
    <div className={className}>
      <div className={avatarContainerClassName}>
        <Avatar
          src={activeAccount?.avatar?.url ?? undefined}
          label={avatarInitials ?? undefined}
          alt={avatarInitials ?? `${activeAccount?.label}'s profile picture`}
          accountType={activeAccount?.type || AccountType.Individual}
          isSizeFixed
          fixedSize="xs"
        />
      </div>

      <Dialog.Title asChild>
        <Typography
          variant="h3"
          className={cx({ hidden: hideTitle })}
        >
          {title}
        </Typography>
      </Dialog.Title>
    </div>
  );
}
