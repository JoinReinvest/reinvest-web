import { MenuGroup } from '../../interfaces';
import { Group } from './Group';

interface Props {
  groups: MenuGroup[];
}

export function Menu({ groups }: Props) {
  const lastGroupIndex = groups.length - 1;

  return (
    <ul className="mt-24 flex flex-col gap-24 lg:mt-30">
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
