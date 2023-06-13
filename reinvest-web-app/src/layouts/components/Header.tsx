import cx from 'classnames';
import { URL } from 'constants/urls';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { ComponentProps, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { ViewNotifications } from 'views/notifications';

import { useModalNotificationsContext } from '../contexts/modal-notifications';
import { AccountMenu } from './AccountMenu';
import { HeaderIcon } from './HeaderIcon';
import { HeaderNavigation } from './HeaderNavigation';
import { NotificationsButton } from './NotificationsButton';

const MENU_ITEMS: ComponentProps<typeof HeaderNavigation>['navigationItems'] = [
  {
    label: 'Community REIT',
    href: URL.community,
  },
  {
    label: 'Education',
    href: URL.education,
  },
];

export const Header = () => {
  const { activeAccount } = useActiveAccount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isModalNotificationsOpen, toggleIsModalNotificationsOpen } = useModalNotificationsContext();
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const headerStyles = cx({
    'container mx-auto flex justify-between py-20 top-0 left-0 right-0 fixed bg-white z-30': true,
    'absolute lg:relative h-screen lg:h-auto w-full z-30 bg-white left-0 right-0': isMenuOpen,
    [RemoveScroll.classNames.zeroRight]: true,
  });

  return (
    <>
      <header className={headerStyles}>
        <div className="flex w-full flex-col gap-100">
          <div className="flex w-full justify-between">
            <div className="flex grow flex-col gap-84 lg:flex-row lg:items-center lg:gap-40">
              <HeaderIcon
                isMenuOpen={isMenuOpen}
                openMenu={openMenu}
                closeMenu={closeMenu}
              />

              <HeaderNavigation
                isMenuOpen={isMenuOpen}
                navigationItems={MENU_ITEMS}
                className="hidden lg:block"
              />
            </div>

            <div className="flex gap-16 lg:gap-24">
              <NotificationsButton />

              {activeAccount && <AccountMenu activeAccount={activeAccount} />}
            </div>
          </div>
          <HeaderNavigation
            isMenuOpen={isMenuOpen}
            navigationItems={MENU_ITEMS}
            className="lg:hidden"
          />
        </div>
      </header>

      <ViewNotifications
        isModalOpen={isModalNotificationsOpen}
        onModalOpenChange={toggleIsModalNotificationsOpen}
      />
    </>
  );
};
