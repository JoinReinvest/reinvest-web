import { AccountManagementProvider } from 'providers/AccountManagement';
import { ActiveAccountConfigurationProvider } from 'providers/ActiveAccountConfigurationProvider';
import { ActiveAccountProvider } from 'providers/ActiveAccountProvider';
import { BankAccountProvider } from 'providers/BankAccount';
import { NotificationsProvider } from 'providers/Notifications';
import { RecurringInvestmentProvider } from 'providers/RecurringInvestmentProvider';
import { UserProfileProvider } from 'providers/UserProfile';
import { PropsWithChildren } from 'react';

import { Header } from './components/Header';
import { ModalNotificationsProvider } from './contexts/modal-notifications';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <UserProfileProvider>
      <ActiveAccountProvider>
        <ActiveAccountConfigurationProvider>
          <BankAccountProvider>
            <AccountManagementProvider>
              {/**
               * Have to use the recurring investments here to
               * know which options to show in the manage account
               * modal.
               */}
              <RecurringInvestmentProvider>
                <NotificationsProvider>
                  <ModalNotificationsProvider>
                    <Header />

                    <main className="container mx-auto pb-20 pt-80 lg:pt-100">{children}</main>
                  </ModalNotificationsProvider>
                </NotificationsProvider>
              </RecurringInvestmentProvider>
            </AccountManagementProvider>
          </BankAccountProvider>
        </ActiveAccountConfigurationProvider>
      </ActiveAccountProvider>
    </UserProfileProvider>
  );
};
