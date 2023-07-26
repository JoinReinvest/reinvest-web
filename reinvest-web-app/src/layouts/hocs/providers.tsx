import { AccountManagementProvider } from 'providers/AccountManagement';
import { ActiveAccountConfigurationProvider } from 'providers/ActiveAccountConfigurationProvider';
import { ActiveAccountProvider } from 'providers/ActiveAccountProvider';
import { BankAccountProvider } from 'providers/BankAccount';
import { ModalCheckProvider } from 'providers/ModalCheck';
import { NotificationsProvider } from 'providers/Notifications';
import { OneTimeInvestmentProvider } from 'providers/OneTimeInvestment';
import { RecurringInvestmentProvider } from 'providers/RecurringInvestmentProvider';
import { UserProfileProvider } from 'providers/UserProfile';
import { ReactNode } from 'react';

import { ModalNotificationsProvider } from '../contexts/modal-notifications';

export function withProviders(children: ReactNode) {
  return (
    <UserProfileProvider>
      <ActiveAccountProvider>
        <ActiveAccountConfigurationProvider>
          <ModalCheckProvider>
            <OneTimeInvestmentProvider>
              <RecurringInvestmentProvider>
                <BankAccountProvider>
                  <AccountManagementProvider>
                    <NotificationsProvider>
                      <ModalNotificationsProvider>{children}</ModalNotificationsProvider>
                    </NotificationsProvider>
                  </AccountManagementProvider>
                </BankAccountProvider>
              </RecurringInvestmentProvider>
            </OneTimeInvestmentProvider>
          </ModalCheckProvider>
        </ActiveAccountConfigurationProvider>
      </ActiveAccountProvider>
    </UserProfileProvider>
  );
}
