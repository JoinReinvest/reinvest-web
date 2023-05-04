import { Avatar } from 'components/Avatar';
import { Typography } from 'components/Typography';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

interface Props {
  fallbackText?: string;
  imageSrc?: string;
  label?: string;
  onClick?: () => void;
  type?: DraftAccountType;
}

export const AccountMenuAccountItem = ({ imageSrc, fallbackText, label, onClick, type }: Props) => (
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
        alt={fallbackText || ''}
        accountType={type}
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
