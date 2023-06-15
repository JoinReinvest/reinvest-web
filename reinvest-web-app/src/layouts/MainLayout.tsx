import { ActiveAccountConfigurationProvider } from 'providers/ActiveAccountConfigurationProvider';
import { ActiveAccountProvider } from 'providers/ActiveAccountProvider';
import { NotificationsProvider } from 'providers/Notifications';
import { UserProfileProvider } from 'providers/UserProfile';
import { PropsWithChildren } from 'react';

import { Header } from './components/Header';
import { ModalNotificationsProvider } from './contexts/modal-notifications';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <UserProfileProvider>
      <ActiveAccountProvider>
        <ActiveAccountConfigurationProvider>
          <NotificationsProvider>
            <ModalNotificationsProvider>
              <Header />

              <main className="container mx-auto pb-20 pt-80 lg:pt-100">{children}</main>
            </ModalNotificationsProvider>
          </NotificationsProvider>
        </ActiveAccountConfigurationProvider>
      </ActiveAccountProvider>
    </UserProfileProvider>
  );
};
