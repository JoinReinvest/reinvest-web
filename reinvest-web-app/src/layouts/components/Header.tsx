import { IconBell } from 'assets/icons/IconBell';
import cx from 'classnames';
import { URL } from 'constants/urls';
import { ComponentProps, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { getApiClient } from 'services/getApiClient';

import { AccountMenu } from './AccountMenu';
import { HeaderIcon } from './HeaderIcon';
import { HeaderNavigation } from './HeaderNavigation';

const MENU_ITEMS: ComponentProps<typeof HeaderNavigation>['navigationItems'] = [
  {
    label: 'Dashboard',
    href: URL.index,
  },
  {
    label: 'Education page',
    href: URL.education,
  },
  {
    label: 'Logout',
    href: URL.logout,
  },
];

export const Header = () => {
  const { data } = useGetUserProfile(getApiClient);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  const headerStyles = cx({
    'container mx-auto flex justify-between py-20 top-0 left-0 right-0 fixed bg-white z-10': true,
    'absolute lg:relative h-screen lg:h-auto w-full z-10 bg-white left-0 right-0': isMenuOpen,
    [RemoveScroll.classNames.zeroRight]: true,
  });

  return (
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
            <IconBell className="h-28 w-28 lg:h-44 lg:w-44" />

            {data && <AccountMenu profile={data} />}
          </div>
        </div>
        <HeaderNavigation
          isMenuOpen={isMenuOpen}
          navigationItems={MENU_ITEMS}
          className="lg:hidden"
        />
      </div>
    </header>
  );
};
