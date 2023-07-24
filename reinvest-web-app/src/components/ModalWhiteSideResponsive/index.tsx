import * as Dialog from '@radix-ui/react-dialog';
import { ModalFooter } from 'components/ModalElements/Footer';
import { PropsWithChildren } from 'react';
import { AccountOverview, Maybe } from 'reinvest-app-common/src/types/graphql';

import { Header } from './Header';

interface Props extends PropsWithChildren {
  activeAccount: Maybe<AccountOverview>;
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
  title: string;
  hideFooter?: boolean;
}

export const ModalWhiteSideResponsive = ({ isOpen, onOpenChange, title, activeAccount, hideFooter = false, children }: Props) => (
  <Dialog.Root
    open={isOpen}
    onOpenChange={onOpenChange}
  >
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black-01/50" />

      <Dialog.Content className="white-modal fixed right-0 top-0 z-50 flex w-full flex-col md:max-w-415 md:pb-24 lg:w-auto">
        <>
          {activeAccount && (
            <Header
              title={title}
              activeAccount={activeAccount}
            />
          )}

          <div className="h-full px-24 pb-24 md:px-44">{children}</div>

          {!hideFooter && (
            <ModalFooter
              modalColor="white"
              width="lg"
            />
          )}
        </>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
