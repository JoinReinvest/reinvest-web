import cx from 'classnames';
import { LinkProps } from 'next/link';

import { IconArrowRight } from '../../../assets/icons/IconArrowRight';
import { Link } from '../../../components/Link';

interface NavigationItem {
  href: LinkProps['href'];
  label: string;
}

interface Props {
  isMenuOpen: boolean;
  navigationItems: NavigationItem[];
}

export const HeaderNavigation = ({ isMenuOpen, navigationItems }: Props) => {
  const navigationClassNames = cx('flex-col w-full lg:flex-row lg:items-center lg:gap-40 gap-12', {
    'lg:flex': true,
    flex: isMenuOpen,
  });

  const navClassName = cx({
    'hidden lg:block': !isMenuOpen,
  });

  return (
    <nav className={navClassName}>
      <ul className={navigationClassNames}>{navigationItems.map(generateNavigationItem)}</ul>
    </nav>
  );
};

const generateNavigationItem = ({ label, href }: NavigationItem) => (
  <li key={label}>
    <Link
      href={href}
      title={label}
      className="typo-paragraph-large flex items-center justify-between text-black no-underline hover:underline"
    >
      <span>{label}</span>
      <IconArrowRight className="h-32 w-32 stroke-black lg:hidden" />
    </Link>
  </li>
);
