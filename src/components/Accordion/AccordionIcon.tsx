import { IconArrowDown } from 'assets/icons/IconArrowDown';
import { IconArrowUp } from 'assets/icons/IconArrowUp';

import { AccordionProps } from './interfaces';
import { variant } from './variants/accordion-icon';

type Props = Pick<AccordionProps, 'isIconRounded' | 'isOpen'>;

export const AccordionIcon = ({ isOpen, isIconRounded }: Props) => {
  const styles = variant({ isIconRounded });

  return <>{isOpen ? <IconArrowUp className={styles} /> : <IconArrowDown className={styles} />}</>;
};
