import { AccordionProps } from './interfaces';
import { variant } from './variants/accordion-title';

type Props = Pick<AccordionProps, 'title' | 'titleSize'>;

export const AccordionTitle = ({ title, titleSize }: Props) => {
  const styles = variant({ titleSize });

  return <h4 className={styles}>{title}</h4>;
};
