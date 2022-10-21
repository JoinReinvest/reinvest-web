import { Trigger as CollapsibleTrigger } from '@radix-ui/react-collapsible';

import { AccordionIcon } from './AccordionIcon';
import { AccordionSubtitle } from './AccordionSubtitle';
import { AccordionTitle } from './AccordionTitle';
import { AccordionProps } from './index';

export type AccordionHeaderProps = Omit<AccordionProps, 'children'>;

export const AccordionHeader = ({ title, titleSize, subtitle, isIconRounded }: AccordionHeaderProps) => (
  <CollapsibleTrigger className="group flex w-full justify-between items-start gap-x-12 text-left">
    <header>
      <AccordionTitle
        title={title}
        titleSize={titleSize}
      />
      {subtitle && <AccordionSubtitle subtitle={subtitle} />}
    </header>

    <AccordionIcon isIconRounded={isIconRounded} />
  </CollapsibleTrigger>
);
