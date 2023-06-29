import { MenuGroup } from '../../interfaces';
import { Group } from './Group';

interface Props {
  groups: MenuGroup[];
}

export function Menu({ groups }: Props) {
  const lastGroupIndex = groups.length - 1;

  return (
    <ul className="flex flex-col gap-24">
      {groups.map((group, index) => (
        <Group
          key={group.identifier}
          group={group}
          addSeparator={index !== lastGroupIndex}
        />
      ))}
    </ul>
  );
}
