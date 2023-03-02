import { Typography } from 'components/Typography';

import { AccordionProps } from './interfaces';

type Props = Pick<AccordionProps, 'subtitle'>;

export const AccordionSubtitle = ({ subtitle }: Props) => (
  <Typography
    variant="paragraph"
    className="text-gray-02"
  >
    {subtitle}
  </Typography>
);
