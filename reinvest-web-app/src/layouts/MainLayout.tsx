import { ActiveAccountConfigurationProvider } from 'providers/ActiveAccountConfigurationProvider';
import { ActiveAccountNotificationsProvider } from 'providers/ActiveAccountNotifications';
import { ActiveAccountProvider } from 'providers/ActiveAccountProvider';
import { PropsWithChildren } from 'react';
import { BeneficiaryCreationFlowProvider } from 'views/beneficiary-creation';

import { Header } from './components/Header';
import { ModalNotificationsProvider } from './contexts/modal-notifications';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <ActiveAccountProvider>
      <ActiveAccountConfigurationProvider>
        <ActiveAccountNotificationsProvider>
          <BeneficiaryCreationFlowProvider initialStoreFields={{}}>
            <ModalNotificationsProvider>
              <Header />

              <main className="container mx-auto pb-20 pt-80 lg:pt-100">{children}</main>
            </ModalNotificationsProvider>
          </BeneficiaryCreationFlowProvider>
        </ActiveAccountNotificationsProvider>
      </ActiveAccountConfigurationProvider>
    </ActiveAccountProvider>
  );
};
