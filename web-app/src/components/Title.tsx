import { Typography } from './Typography';

interface Props {
  title: string;
  subtitle?: string;
}
export const Title = ({ title, subtitle }: Props) => (
  <>
    <Typography variant="h5">{title}</Typography>
    {subtitle && <Typography variant="paragraph-large">{subtitle}</Typography>}
  </>
);
