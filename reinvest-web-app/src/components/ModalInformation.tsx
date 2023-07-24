import * as Dialog from '@radix-ui/react-dialog';
import { IconClose } from 'assets/icons/IconClose';
import { PropsWithChildren } from 'react';
import { ModalProps } from 'types/modal';

import { Typography } from './Typography';

interface Props extends ModalProps, PropsWithChildren {
  title: string;
}

export function ModalInformation({ title, isModalOpen, onModalOpenChange, children }: Props) {
  return (
    <Dialog.Root
      open={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black-01/50" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-70 w-full max-w-400 -translate-x-1/2 -translate-y-1/2 p-24">
          <article className="flex max-h-screen-4/5 w-full flex-col gap-32 overflow-y-auto bg-white p-24">
            <header className="flex items-center justify-between">
              <Dialog.Title>
                <Typography variant="h6">{title}</Typography>
              </Dialog.Title>

              <Dialog.Close>
                <IconClose className="stroke-black-01" />
              </Dialog.Close>
            </header>

            <Dialog.Description>
              <Typography variant="paragraph-large">{children}</Typography>
            </Dialog.Description>
          </article>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
