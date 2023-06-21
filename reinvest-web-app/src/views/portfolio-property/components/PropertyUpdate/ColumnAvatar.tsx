import { Avatar } from 'components/Avatar';
import { PropertyDetails } from 'types/portfolio-property';

import { DashedLine } from './DashedLine';

interface Props {
  updateAuthor: PropertyDetails['updates'][0]['author'];
}

export const ColumnAvatar = ({ updateAuthor }: Props) => (
  <div className="flex flex-col items-center gap-16">
    <div>
      <Avatar
        isSizeFixed
        fixedSize="sm"
        src={updateAuthor.uri}
        alt={updateAuthor.initials}
      />
    </div>

    <DashedLine />
  </div>
);
