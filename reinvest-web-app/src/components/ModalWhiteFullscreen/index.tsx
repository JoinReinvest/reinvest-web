import * as Dialog from '@radix-ui/react-dialog';
import { PropsWithChildren } from 'react';
import { AccountOverview, Maybe } from 'reinvest-app-common/src/types/graphql';

import { Content } from './Content';
import { Header } from './Header';
import { HeaderActiveAccount } from './HeaderActiveAccount';

interface Props extends PropsWithChildren {
  activeAccount: Maybe<AccountOverview>;
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
  isBackButtonEnabled?: boolean;
}

export const ModalWhiteFullscreen = ({ isOpen, onOpenChange, activeAccount, children, isBackButtonEnabled }: Props) => (
  <Dialog.Root
    open={isOpen}
    onOpenChange={onOpenChange}
  >
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black-01/50" />

      <Dialog.Content className="white-modal fixed inset-0 z-50 flex flex-col gap-24 overflow-y-hidden pb-24 md:pt-60">
        <>
          <HeaderActiveAccount activeAccount={activeAccount} />

          <Header isBackButtonEnabled={isBackButtonEnabled} />

          <Content>{children}</Content>
        </>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
