import cx from 'classnames';
import { LinkProps } from 'next/link';

import { HeaderNavigationItem } from './HeaderNavigationItem';

interface NavigationItem {
  href: LinkProps['href'];
  label: string;
}

interface Props {
  isMenuOpen: boolean;
  navigationItems: NavigationItem[];
}

export const HeaderNavigation = ({ isMenuOpen, navigationItems }: Props) => {
  const navigationClassNames = cx(['lg:flex lg:items-center lg:gap-40', 'lg:absolute lg:top-0 lg:pt-180 lg:w-full lg:h-full lg:bg-white'], {
    'lg:flex lg:flex-col lg:gap-12': isMenuOpen,
    hidden: !isMenuOpen,
  });

  return <nav className={navigationClassNames}>{navigationItems.map(generateNavigationItem)}</nav>;
};

const generateNavigationItem = ({ label, href }: NavigationItem) => (
  <HeaderNavigationItem
    key={label.toLowerCase().replace(' ', '-')}
    href={href}
  >
    {label}
  </HeaderNavigationItem>
);
