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
  const navigationClassNames = cx(
    ['lg:flex lg:items-center lg:gap-40', 'max-lg:absolute max-lg:top-0 max-lg:pt-180 max-lg:w-full max-lg:h-full max-lg:bg-white'],
    {
      'max-lg:flex max-lg:flex-col max-lg:gap-12': isMenuOpen,
      'max-lg:hidden': !isMenuOpen,
    },
  );

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
