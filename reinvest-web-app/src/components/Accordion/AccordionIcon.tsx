import { IconArrowDown } from 'assets/icons/IconArrowDown';
import { IconArrowUp } from 'assets/icons/IconArrowUp';

interface Props {
  isOpen: boolean;
}

export const AccordionIcon = ({ isOpen }: Props) => (
  <div className="grid h-32 w-32 place-items-center rounded-full bg-green-frost-01">
    {isOpen ? <IconArrowUp className="stroke-black-01" /> : <IconArrowDown className="stroke-black-01" />}
  </div>
);
