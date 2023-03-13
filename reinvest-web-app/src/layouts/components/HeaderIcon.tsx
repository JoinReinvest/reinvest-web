import { IconClose } from 'assets/icons/IconClose';
import { IconMenu } from 'assets/icons/IconMenu';
import { LogoIcon } from 'assets/LogoIcon';
import cx from 'classnames';

interface Props {
  closeMenu: () => void;
  isMenuOpen: boolean;
  openMenu: () => void;
}

export const HeaderIcon = ({ isMenuOpen, openMenu, closeMenu }: Props) => {
  const mobileIconBaseClassnames = 'fill-black h-28 w-28 lg:hidden cursor-pointer';

  const iconMenuOpenClassnames = cx(mobileIconBaseClassnames, { hidden: isMenuOpen, block: !isMenuOpen });
  const iconMenuClosedClassnames = cx(mobileIconBaseClassnames, { block: isMenuOpen, hidden: !isMenuOpen });

  return (
    <div className="relative">
      <LogoIcon className="fill-black hidden h-38 w-38 lg:block" />

      <IconMenu
        className={iconMenuOpenClassnames}
        onClick={openMenu}
      />

      <IconClose
        className={iconMenuClosedClassnames}
        onClick={closeMenu}
      />
    </div>
  );
};
