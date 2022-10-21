import cx from 'classnames';

import { AccordionHeaderProps } from './AccordionHeader';

type AccordionTitleProps = Pick<AccordionHeaderProps, 'title' | 'titleSize'>;

export const AccordionTitle = ({ title, titleSize }: AccordionTitleProps) => (
  <h4
    className={cx({
      'text-md font-medium': titleSize === 'sm',
      'text-xl font-[450] tracking-tighter': titleSize === 'lg',
    })}
  >
    {title}
  </h4>
);
