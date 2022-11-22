import { AccordionIcon } from './AccordionIcon';
import { AccordionSubtitle } from './AccordionSubtitle';
import { AccordionTitle } from './AccordionTitle';
import { AccordionProps } from './interfaces';

type Props = Omit<AccordionProps, 'children'>;

export const AccordionHeader = ({ isOpen, title, titleSize, subtitle, isIconRounded }: Props) => (
  <header className="group flex w-full justify-between items-start gap-x-12 text-left">
    <div>
      <AccordionTitle
        title={title}
        titleSize={titleSize}
      />
      {subtitle && <AccordionSubtitle subtitle={subtitle} />}
    </div>

    <AccordionIcon
      isIconRounded={isIconRounded}
      isOpen={isOpen}
    />
  </header>
);
