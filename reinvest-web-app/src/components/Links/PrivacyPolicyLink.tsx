import { Typography } from 'components/Typography';

interface Props {
  onClick?: () => void;
}

export const PrivacyPolicyLink = ({ onClick }: Props) => (
  <div
    className="text-green-frost-01 inline-flex"
    onKeyDown={onClick}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    <Typography variant="span-link">Privacy Policy</Typography>
  </div>
);
