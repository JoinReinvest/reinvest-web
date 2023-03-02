import { Typography } from 'components/Typography';

interface Props {
  onClick?: () => void;
}

export const WhyRequiredLink = ({ onClick }: Props) => (
  <div
    className="mt-20 w-max text-green-frost-01"
    onKeyDown={onClick}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    <Typography variant="link">Required. Why?</Typography>
  </div>
);
