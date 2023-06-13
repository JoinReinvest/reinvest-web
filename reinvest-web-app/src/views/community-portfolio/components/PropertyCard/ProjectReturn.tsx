import { Typography } from 'components/Typography';

interface Props {
  value: string;
}

const PREFIX = 'Project Return: ';

export const ProjectReturn = ({ value }: Props) => (
  <Typography variant="paragraph-small">
    <span className="text-gray-02">{PREFIX}</span>
    <span>{value}</span>
  </Typography>
);
