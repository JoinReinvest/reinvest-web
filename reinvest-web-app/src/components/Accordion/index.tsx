import { Collapsible } from '@hookooekoo/ui-collapsible';
import { ReactNode } from 'react';

import { AccordionHeader } from './AccordionHeader';

interface Props {
  children: ReactNode;
  subtitle: string;
  title: string;
  className?: string;
  isOpen?: boolean;
}

export const Accordion = ({ isOpen = false, title, subtitle, children, className }: Props) => (
  <Collapsible
    isOpen={isOpen}
    className={className}
    header={isOpen => (
      <AccordionHeader
        isOpen={isOpen}
        title={title}
        subtitle={subtitle}
      />
    )}
  >
    <div>{children}</div>
  </Collapsible>
);
