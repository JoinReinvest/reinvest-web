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

  const iconMenuOpenClassnames = cx(mobileIconBaseClassnames, { 'max-lg:hidden': isMenuOpen, 'max-lg:block': !isMenuOpen });

  const iconMenuClosedClassnames = cx(mobileIconBaseClassnames, { 'max-lg:block': isMenuOpen, 'max-lg:hidden': !isMenuOpen });

  return (
    <div className="max-lg:relative max-lg:z-20">
      <LogoIcon className="lg:fill-black max-lg:hidden lg:h-38 lg:w-38" />

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
