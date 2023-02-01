import { Collapsible } from '@hookooekoo/ui-collapsible';

import { AccordionHeader } from './AccordionHeader';
import { AccordionProps } from './interfaces';
import { variant } from './variants';

export const Accordion = ({ isOpen = false, title, titleSize = 'sm', subtitle, isIconRounded, children, className = '', isChild = false }: AccordionProps) => {
  const styles = variant({ isChild, className });

  return (
    <Collapsible
      isOpen={isOpen}
      className={styles}
      header={isOpen => (
        <AccordionHeader
          isOpen={isOpen}
          title={title}
          titleSize={titleSize}
          subtitle={subtitle}
          isIconRounded={isIconRounded}
        />
      )}
    >
      <div className="text-14 text-secondary-2">{children}</div>
    </Collapsible>
  );
};
