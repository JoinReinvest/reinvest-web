import { Typography } from './Typography';

interface Props {
  title: string;
}

export const Title = ({ title }: Props) => <Typography variant="h5" className="mb-30 text-center">{title}</Typography>;
