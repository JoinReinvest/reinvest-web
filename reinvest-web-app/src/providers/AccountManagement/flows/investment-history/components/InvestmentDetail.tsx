import { Typography } from 'components/Typography';

interface Props {
  title: string;
  value: string;
}

export const InvestmentDetail = ({ title, value }: Props) => (
  <div className="flex flex-col">
    <dt className="capitalize">
      <Typography
        variant="paragraph"
        className="text-gray-01"
      >
        {title}
      </Typography>
    </dt>

    <dd>
      <Typography
        variant="h6"
        className="capitalize"
      >
        {value}
      </Typography>
    </dd>
  </div>
);
