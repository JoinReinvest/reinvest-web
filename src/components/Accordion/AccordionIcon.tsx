import { IconArrowDown } from 'assets/icons/IconArrowDown';
import { IconArrowUp } from 'assets/icons/IconArrowUp';
import cx from 'classnames';

import { AccordionProps } from './index';

type AccordionIconProps = Pick<AccordionProps, 'isIconRounded'>;

export const AccordionIcon = ({ isIconRounded }: AccordionIconProps) => {
  const styles = cx({
    'stroke-[1.5px]': true,
    'p-4 rounded-full bg-green-frost-solid': isIconRounded,
  });

  const iconArrowDownStyles = cx(styles, 'group-radix-state-open:hidden', 'group-radix-state-closed:block');

  const iconArrowUpStyles = cx(styles, 'group-radix-state-open:block', 'group-radix-state-closed:hidden');

  return (
    <>
      <IconArrowDown className={iconArrowDownStyles} />
      <IconArrowUp className={iconArrowUpStyles} />
    </>
  );
};
