import { IconBell } from 'assets/icons/IconBell';
import placeholderPicture from 'assets/images/profile-picture-placeholder.png';
import cx from 'classnames';
import { Avatar } from 'components/Avatar';
import { URL } from 'constants/urls';
import { ComponentProps, useState } from 'react';

import { useGetUserProfile } from '../../../services/queries/getProfile';
import { HeaderIcon } from './HeaderIcon';
import { HeaderNavigation } from './HeaderNavigation';

const MENU_ITEMS: ComponentProps<typeof HeaderNavigation>['navigationItems'] = [
  {
    label: 'Dashboard',
    href: URL.index,
  },
  {
    label: 'Education page',
    href: '/education',
  },
  {
    label: 'FAQ',
    href: '/education/faq',
  },
  {
    label: 'Glossary',
    href: '/education/glossary',
  },
  {
    label: 'Calculator',
    href: '/education/calculator',
  },
];

export const Header = () => {
  const { data } = useGetUserProfile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  const headerStyles = cx({
    'container mx-auto flex justify-between py-20': true,
    'absolute lg:relative h-screen lg:h-auto w-full z-10 bg-white left-0 right-0': isMenuOpen,
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

            {data && (
              <Avatar
                src={data?.avatar?.url || placeholderPicture}
                alt={`${data?.details?.firstName} ${data?.details?.lastName}`}
              />
            )}
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
