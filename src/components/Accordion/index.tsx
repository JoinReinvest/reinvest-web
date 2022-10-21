import { Content as CollapsibleContent, Root as CollapsibleRoot } from '@radix-ui/react-collapsible';
import cx from 'classnames';
import { ReactNode } from 'react';

import { AccordionHeader } from './AccordionHeader';

export interface AccordionProps {
  children: ReactNode;
  title: string;
  className?: string;
  isChild?: boolean;
  isIconRounded?: boolean;
  isOpen?: boolean;
  subtitle?: string;
  titleSize?: 'sm' | 'lg';
}

export const Accordion = ({ isOpen = false, title, titleSize = 'sm', subtitle, isIconRounded, children, className = '', isChild = false }: AccordionProps) => {
  const styles = cx({ 'flex flex-col gap-y-8': true, 'p-24': !isChild, 'py-24 px-0': !!isChild, [className]: !!className });

  return (
    <CollapsibleRoot defaultOpen={isOpen}>
      <div className={styles}>
        <AccordionHeader
          title={title}
          titleSize={titleSize}
          subtitle={subtitle}
          isIconRounded={isIconRounded}
        />

        <CollapsibleContent className="text-14 text-secondary-2">{children}</CollapsibleContent>
      </div>
    </CollapsibleRoot>
  );
};
