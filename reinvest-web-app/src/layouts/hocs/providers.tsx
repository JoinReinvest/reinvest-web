import { AccountManagementProvider } from 'providers/AccountManagement';
import { ActiveAccountConfigurationProvider } from 'providers/ActiveAccountConfigurationProvider';
import { ActiveAccountProvider } from 'providers/ActiveAccountProvider';
import { BankAccountProvider } from 'providers/BankAccount';
import { NotificationsProvider } from 'providers/Notifications';
import { RecurringInvestmentProvider } from 'providers/RecurringInvestmentProvider';
import { UserProfileProvider } from 'providers/UserProfile';
import { ReactNode } from 'react';

import { ModalNotificationsProvider } from '../contexts/modal-notifications';

export function withProviders(children: ReactNode) {
  return (
    <UserProfileProvider>
      <ActiveAccountProvider>
        <ActiveAccountConfigurationProvider>
          <RecurringInvestmentProvider>
            <BankAccountProvider>
              <AccountManagementProvider>
                <NotificationsProvider>
                  <ModalNotificationsProvider>{children}</ModalNotificationsProvider>
                </NotificationsProvider>
              </AccountManagementProvider>
            </BankAccountProvider>
          </RecurringInvestmentProvider>
        </ActiveAccountConfigurationProvider>
      </ActiveAccountProvider>
    </UserProfileProvider>
  );
}
