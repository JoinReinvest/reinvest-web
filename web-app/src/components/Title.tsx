import { Typography } from './Typography';

interface Props {
  title: string;
  subtitle?: string;
}

export const Title = ({ title, subtitle }: Props) => (
  <div className="mb-60 text-left md:text-center">
    <Typography
      variant="h5"
      className="mb-8"
    >
      {title}
    </Typography>
    {subtitle && <Typography variant="paragraph-large">{subtitle}</Typography>}
  </div>
);
