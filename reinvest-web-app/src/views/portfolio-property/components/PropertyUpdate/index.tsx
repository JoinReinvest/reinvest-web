import { PropertyDetails } from 'types/portfolio-property';

import { ColumnAvatar } from './ColumnAvatar';
import { ColumnContent } from './ColumnContent';

interface Props {
  update: PropertyDetails['updates'][0];
}

export const PropertyUpdate = ({ update }: Props) => (
  <li className="flex w-315 min-w-full gap-16">
    <ColumnAvatar updateAuthor={update.author} />

    <ColumnContent
      date={update.date}
      updateContent={update.content}
    />
  </li>
);
