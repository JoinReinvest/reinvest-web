import { AccordionProps } from './interfaces';

type Props = Pick<AccordionProps, 'subtitle'>;

export const AccordionSubtitle = ({ subtitle }: Props) => <p className="text-12 text-gray-02">{subtitle}</p>;
