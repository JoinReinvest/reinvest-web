import { Separator } from 'components/Separator';
import { Typography } from 'components/Typography';

import { MenuGroup } from '../../interfaces/menu';
import { GroupItem } from './GroupItem';

interface Props {
  group: MenuGroup;
  addSeparator?: boolean;
}

export const Group = ({ group, addSeparator }: Props) => (
  <>
    <li className="flex flex-col gap-24">
      <Typography variant="h4-expanded">{group.label}</Typography>

      <ul className="flex flex-col gap-16">
        {group.items.map(menuItem => (
          <GroupItem
            key={menuItem.identifier}
            item={menuItem}
          />
        ))}
      </ul>
    </li>

    {addSeparator && <Separator />}
  </>
);
