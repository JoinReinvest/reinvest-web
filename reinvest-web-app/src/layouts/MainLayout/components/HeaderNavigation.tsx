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
  className?: string;
}

export const HeaderNavigation = ({ isMenuOpen, navigationItems, className = '' }: Props) => {
  const listClassNames = cx('flex-col w-full lg:flex-row lg:items-center lg:gap-40 gap-12', {
    'lg:flex': true,
    flex: isMenuOpen,
  });

  const navClassName = cx({
    'hidden lg:block': !isMenuOpen,
    [className]: true,
  });

  return (
    <nav className={navClassName}>
      <ul className={listClassNames}>{navigationItems.map(generateNavigationItem)}</ul>
    </nav>
  );
};

const generateNavigationItem = ({ label, href }: NavigationItem) => (
  <li key={label}>
    <Link
      href={href}
      title={label}
      className="typo-paragraph-large text-black flex items-center justify-between no-underline hover:underline"
    >
      <span>{label}</span>
      <IconArrowRight className="stroke-black h-32 w-32 lg:hidden" />
    </Link>
  </li>
);
