import { AccordionProps } from './interfaces';
import { Typography } from 'components/Typography';

type Props = Pick<AccordionProps, 'subtitle'>;

export const AccordionSubtitle = ({ subtitle }: Props) => (
  <Typography
    variant="paragraph"
    className="text-gray-02"
  >
    {subtitle}
  </Typography>
);
