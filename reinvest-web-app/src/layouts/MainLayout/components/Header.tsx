import { IconBell } from 'assets/icons/IconBell';
import placeholderPicture from 'assets/images/profile-picture-placeholder.png';
import { Avatar } from 'components/Avatar';
import { ComponentProps, useState } from 'react';

import { useGetUserProfile } from '../../../services/queries/getProfile';
import { HeaderIcon } from './HeaderIcon';
import { HeaderNavigation } from './HeaderNavigation';

const MENU_ITEMS: ComponentProps<typeof HeaderNavigation>['navigationItems'] = [
  {
    label: 'Dashboard',
    href: '/',
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
];

export const Header = () => {
  const { data } = useGetUserProfile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="container mx-auto flex items-center justify-between py-20">
      <div className="flex items-center gap-40">
        <HeaderIcon
          isMenuOpen={isMenuOpen}
          openMenu={openMenu}
          closeMenu={closeMenu}
        />

        <HeaderNavigation
          isMenuOpen={isMenuOpen}
          navigationItems={MENU_ITEMS}
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
    </header>
  );
};
