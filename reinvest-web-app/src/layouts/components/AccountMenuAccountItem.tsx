import { Avatar } from 'components/Avatar';
import { Typography } from 'components/Typography';
import { AccountType, DraftAccountType } from 'reinvest-app-common/src/types/graphql';

interface Props {
  avatarInitials: string;
  imageSrc?: string;
  label?: string;
  onClick?: () => void;
  type?: DraftAccountType | AccountType;
}

export const AccountMenuAccountItem = ({ imageSrc, avatarInitials, label, onClick, type }: Props) => (
  <li className="cursor-pointer">
    <div
      className="flex items-center gap-8"
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      <Avatar
        src={imageSrc}
        isSizeFixed
        fixedSize="sm"
        alt={avatarInitials}
        accountType={type}
        label={avatarInitials}
      />

      <Typography
        variant="button"
        className="capitalize"
      >
        {label}
      </Typography>
    </div>
  </li>
);
