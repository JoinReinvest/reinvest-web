import { IconArrowRight } from 'assets/icons/IconArrowRight';
import { Typography } from 'components/Typography';

import { useFlowsManager } from '../../contexts/FlowsManager';
import { MenuItem } from '../../interfaces/menu';

interface Props {
  item: MenuItem;
}

export function GroupItem({ item }: Props) {
  const { setCurrentFlowIdentifier } = useFlowsManager();

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
