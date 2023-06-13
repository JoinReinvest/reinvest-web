import * as Dialog from '@radix-ui/react-dialog';
import { Separator } from '@radix-ui/react-separator';
import { IconClose } from 'assets/icons/IconClose';
import { LogoIcon } from 'assets/LogoIcon';
import { LogoIcon2 } from 'assets/LogoIcon2';
import cx from 'classnames';
import { Typography } from 'components/Typography';
import { PropsWithChildren } from 'react';
import { ModalProps } from 'types/modal';

interface Props extends PropsWithChildren, ModalProps {
  hideSeparator?: boolean;
  title?: string;
}

export const ModalWhiteWatermarkSide = ({ isModalOpen, onModalOpenChange, title, children, hideSeparator }: Props) => {
  const contentClassName = cx('h-full overflow-y-auto px-24 md:px-44 pt-32');

  return (
    <Dialog.Root
      open={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black-01/50" />

        <Dialog.Content className="white-modal fixed right-0 top-0 z-50 flex flex-col gap-24 overflow-hidden py-24 md:max-w-415">
          <>
            <header className="flex items-center justify-between px-44 pt-40 md:hidden">
              <LogoIcon2 />

              <Dialog.Close asChild>
                <IconClose />
              </Dialog.Close>
            </header>

            {title && (
              <Dialog.Title className="hidden px-24 pt-24 md:block md:px-44">
                <Typography variant="h3">{title}</Typography>
              </Dialog.Title>
            )}

            <div className="h-full overflow-y-hidden">
              {!hideSeparator && <Separator className="h-1 w-full bg-gray-04 md:h-0" />}

              <div className={contentClassName}>{children}</div>
            </div>

            <LogoIcon className="absolute -bottom-30 -right-137 -z-10 ml-50 h-460 w-460 fill-gray-04 lg:-bottom-0 lg:left-94" />
          </>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
