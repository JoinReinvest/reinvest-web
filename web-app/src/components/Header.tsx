import { Typography } from './Typography';

interface Props {
  title: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: Props) => (
  <>
    <Typography variant="heading-5">{title}</Typography>
    {subtitle && <Typography variant="paragraph-large">{subtitle}</Typography>}
  </>
);
