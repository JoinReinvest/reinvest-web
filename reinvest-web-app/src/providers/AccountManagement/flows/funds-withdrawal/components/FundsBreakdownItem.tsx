import { Typography } from 'components/Typography';

interface Props {
  label: string;
  value: string;
}

export const FundsBreakdownItem = ({ label, value }: Props) => (
  <li className="flex items-center justify-between border-b border-b-gray-04 py-8">
    <Typography variant="paragraph-large">{label}</Typography>

    <Typography
      variant="paragraph-large"
      className="font-medium"
    >
      {value}
    </Typography>
  </li>
);
