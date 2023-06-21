import * as Dialog from '@radix-ui/react-dialog';
import placeholderImage from 'assets/images/profile-picture-placeholder.png';
import cx from 'classnames';
import { Avatar } from 'components/Avatar';
import { Typography } from 'components/Typography';
import { useActiveAccount } from 'providers/ActiveAccountProvider';

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

  return (
    <div className={className}>
      <div className={avatarContainerClassName}>
        <Avatar
          src={activeAccount?.avatar?.url || placeholderImage}
          alt={activeAccount?.avatar?.initials || ''}
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
