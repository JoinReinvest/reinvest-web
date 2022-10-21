import { AccordionHeaderProps } from './AccordionHeader';

type AccordionSubtitleProps = Pick<AccordionHeaderProps, 'subtitle'>;

export const AccordionSubtitle = ({ subtitle }: AccordionSubtitleProps) => <p className="text-12 text-secondary-3">{subtitle}</p>;
