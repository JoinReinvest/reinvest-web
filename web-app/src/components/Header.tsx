import { Typography } from './Typography';

interface Props {
  title: string;
}

export const Header = ({ title }: Props) => <Typography variant="heading-5">{title}</Typography>;
