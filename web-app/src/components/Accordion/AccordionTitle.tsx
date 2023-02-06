import { Typography } from 'components/Typography';
import { AccordionProps } from './interfaces';

type Props = Pick<AccordionProps, 'title' | 'titleSize'>;

export const AccordionTitle = ({ title, titleSize }: Props) => {
  const sizeIsSm = titleSize === 'sm';
  const variant = sizeIsSm ? 'heading-6' : 'bonus-heading';

  return <Typography variant={variant}>{title}</Typography>;
};
