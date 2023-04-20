import placeholderPicture from 'assets/images/profile-picture-placeholder.png';
import { Avatar } from 'components/Avatar';
import { Typography } from 'components/Typography';

interface Props {
  fallbackText?: string;
  imageSrc?: string;
  label?: string;
  onClick?: () => void;
}

export const AccountMenuAccountItem = ({ imageSrc, fallbackText, label, onClick }: Props) => (
  <li className="cursor-pointer">
    <div
      className="flex items-center gap-8"
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      <Avatar
        src={imageSrc || placeholderPicture}
        isSizeFixed
        fixedSize="sm"
        alt={fallbackText || ''}
      />

      <Typography variant="button">{label}</Typography>
    </div>
  </li>
);
