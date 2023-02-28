import { IconBell } from 'assets/icons/IconBell';
import placeholderPicture from 'assets/images/profile-picture-placeholder.png';
import { LogoIcon } from 'assets/LogoIcon';
import { Avatar } from 'components/Avatar';
import { Typography } from 'components/Typography';

export const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-40">
        <LogoIcon className="fill-black h-28 w-28 lg:h-38 lg:w-38" />
        <Typography variant="paragraph">Community REIT</Typography>
        <Typography variant="paragraph">Education</Typography>
      </nav>

      <div className="flex gap-16 lg:gap-24">
        <IconBell className="h-28 w-28 lg:h-44 lg:w-44" />
        <Avatar
          src={placeholderPicture}
          alt="profile picture"
        />
      </div>
    </header>
  );
};
