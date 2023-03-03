import { Typography } from 'components/Typography';

interface Props {
  onClick?: () => void;
}

export const ResendCodeLink = ({ onClick }: Props) => (
  <div
    className="w-max text-green-frost-01"
    onKeyDown={onClick}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    <Typography variant="link">Resend Code</Typography>
  </div>
);
