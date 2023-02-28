import { IconBell } from 'assets/icons/IconBell';
import placeholderPicture from 'assets/images/profile-picture-placeholder.png';
import { Avatar } from 'components/Avatar';
import { ComponentProps, Dispatch, SetStateAction } from 'react';

import { HeaderIcon } from './HeaderIcon';
import { HeaderNavigation } from './HeaderNavigation';

const MENU_ITEMS: ComponentProps<typeof HeaderNavigation>['navigationItems'] = [
  {
    label: 'Dashboard',
    href: '/',
  },
  {
    label: 'Community REIT',
    href: '/',
  },
  {
    label: 'Education',
    href: '/',
  },
];

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ isMenuOpen, setIsMenuOpen }: Props) => {
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="flex items-center justify-between">
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

      <div className="flex gap-16 max-lg:relative max-lg:z-20 lg:gap-24">
        <IconBell className="h-28 w-28 lg:h-44 lg:w-44" />

        <Avatar
          src={placeholderPicture}
          alt="profile picture"
        />
      </div>
    </header>
  );
};
