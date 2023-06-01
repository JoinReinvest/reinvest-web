import * as Dialog from '@radix-ui/react-dialog';
import { Separator } from '@radix-ui/react-separator';
import { IconClose } from 'assets/icons/IconClose';
import placeholderImage from 'assets/images/profile-picture-placeholder.png';
import { Logo } from 'assets/Logo';
import cx from 'classnames';
import { Avatar } from 'components/Avatar';
import { Typography } from 'components/Typography';
import { PropsWithChildren } from 'react';
import { AccountOverview, Maybe } from 'reinvest-app-common/src/types/graphql';

interface Props extends PropsWithChildren {
  activeAccount: Maybe<AccountOverview>;
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
  title: string;
  addPaddingBottom?: boolean;
  className?: string;
  displayReinvestLogo?: boolean;
  hideAvatarNextToTitle?: boolean;
}

export const ModalWhite = ({
  isOpen,
  onOpenChange,
  title,
  activeAccount,
  addPaddingBottom = true,
  hideAvatarNextToTitle = false,
  className,
  children,
  displayReinvestLogo = true,
}: Props) => {
  const avatarContainerClassName = cx({ hidden: !!hideAvatarNextToTitle });
  const contentClassName = cx('h-full overflow-y-auto px-24 md:px-44', { 'pb-24': !!addPaddingBottom });

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black-01/50" />

        <Dialog.Content className={cx('white-modal fixed right-0 top-0 z-50 flex flex-col md:max-w-415', className, { 'gap-24': !className })}>
          <>
            <header className="flex items-center justify-between px-24 pb-22 pt-12 text-black-01 md:hidden md:px-44">
              <Dialog.Close>
                <IconClose />
              </Dialog.Close>

              {displayReinvestLogo && <Logo className="fill-black-01" />}

              <Avatar
                src={activeAccount?.avatar?.url || placeholderImage}
                alt={activeAccount?.avatar?.initials || ''}
                isSizeFixed
                fixedSize="xs"
              />
            </header>

            <div className="flex items-center gap-8 px-24 md:px-44 md:pt-44">
              <div className={avatarContainerClassName}>
                <Avatar
                  src={activeAccount?.avatar?.url || placeholderImage}
                  alt={activeAccount?.avatar?.initials || ''}
                  isSizeFixed
                  fixedSize="xs"
                />
              </div>

              <Dialog.Title asChild>
                <Typography variant="h3">{title}</Typography>
              </Dialog.Title>
            </div>

            <div className="h-full overflow-y-hidden">
              <Separator className="h-1 w-full bg-gray-04 md:h-0" />

              <div className={contentClassName}>{children}</div>
            </div>
          </>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
