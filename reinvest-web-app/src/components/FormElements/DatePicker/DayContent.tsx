import { Typography } from 'components/Typography';

interface Props {
  dayOfMonth: number;
  date?: Date;
}

export const DayContent = ({ dayOfMonth }: Props) => {
  return <Typography variant="h6">{dayOfMonth}</Typography>;
};
