import * as Dialog from '@radix-ui/react-dialog';
import { IconClose } from 'assets/icons/IconClose';
import { LogoIcon } from 'assets/LogoIcon';
import { LogoIcon2 } from 'assets/LogoIcon2';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
}

export const ModalWhiteWatermark = ({ isOpen, onOpenChange, children }: Props) => (
  <Dialog.Root
    open={isOpen}
    onOpenChange={onOpenChange}
  >
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black-01/50" />

      <Dialog.Content className="white-modal fixed inset-0 z-50 flex flex-col gap-24">
        <>
          <header className="flex items-center justify-between px-24 pt-40 md:px-60 md:pt-66">
            <LogoIcon2 />

            <Dialog.Close asChild>
              <IconClose />
            </Dialog.Close>
          </header>

          <div className="h-full px-24 pb-24 md:px-44">
            <div className="mx-auto h-full w-full max-w-330">{children}</div>
          </div>

          <LogoIcon className="absolute -bottom-30 -right-137 -z-10 ml-50 h-460 w-460 fill-gray-04 lg:-bottom-169 lg:-right-36 lg:h-650 lg:w-650" />
        </>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
