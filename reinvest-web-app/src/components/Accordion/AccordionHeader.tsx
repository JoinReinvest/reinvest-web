import cx from 'classnames';
import { Typography } from 'components/Typography';

import { AccordionIcon } from './AccordionIcon';

interface Props {
  isOpen: boolean;
  subtitle: string;
  title: string;
}

export const AccordionHeader = ({ isOpen, title, subtitle }: Props) => {
  const className = cx(['px-24 py-16 w-full', 'flex items-start justify-between gap-12 text-left'], {
    'border-x border-t border-x-gray-04 border-t-gray-04': isOpen,
    'border border-gray-04': !isOpen,
  });

  return (
    <header className={className}>
      <div className="flex flex-col gap-4">
        <Typography variant="h5">{title}</Typography>

        <Typography
          variant="paragraph-emphasized-regular"
          className="text-gray-02"
        >
          {subtitle}
        </Typography>
      </div>

      <AccordionIcon isOpen={isOpen} />
    </header>
  );
};
