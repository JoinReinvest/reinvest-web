import { IconArrowRight } from 'assets/icons/IconArrowRight';
import { Typography } from 'components/Typography';
import { useAccountManagement } from 'providers/AccountManagement';

import { MenuItem } from '../../interfaces';

interface Props {
  item: MenuItem;
}

export function GroupItem({ item }: Props) {
  const { setCurrentFlowIdentifier } = useAccountManagement();

  const onClick = () => {
    setCurrentFlowIdentifier(item.identifier);
  };

  return (
    <li className="cursor-pointer">
      <div
        className="flex items-center justify-between gap-16"
        role="button"
        onClick={onClick}
        onKeyDown={onClick}
        tabIndex={0}
      >
        <Typography variant="h6">{item.label}</Typography>

        <IconArrowRight />
      </div>
    </li>
  );
}
