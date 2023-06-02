import * as Dialog from '@radix-ui/react-dialog';
import cx from 'classnames';
import { PropsWithChildren } from 'react';

import { Content } from './Content';
import { HeaderMobile } from './HeaderMobile';
import { HeaderWithTitle } from './HeaderWithTitle';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
  title: string;
  addPaddingBottom?: boolean;
  className?: string;
  hideAvatarNextToTitle?: boolean;
  hideHeaderOnMobile?: boolean;
  hideLogoOnMobile?: boolean;
  hideSeparator?: boolean;
}

export const ModalWhite = ({
  isOpen,
  onOpenChange,
  title,
  addPaddingBottom = true,
  hideAvatarNextToTitle = false,
  hideHeaderOnMobile = false,
  hideLogoOnMobile = false,
  hideSeparator = false,
  className,
  children,
}: Props) => {
  const overlayClassName = 'fixed inset-0 z-40 bg-black-01/50';
  const contentClassName = cx('white-modal fixed right-0 top-0 z-50 flex flex-col gap-24 md:max-w-415', className);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={overlayClassName} />

        <Dialog.Content className={contentClassName}>
          <>
            <HeaderMobile hideLogoOnMobile={hideLogoOnMobile} />

            <HeaderWithTitle
              title={title}
              hideAvatarNextToTitle={hideAvatarNextToTitle}
              hideHeaderOnMobile={hideHeaderOnMobile}
            />

            <Content
              addPaddingBottom={addPaddingBottom}
              hideSeparator={hideSeparator}
            >
              {children}
            </Content>
          </>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
