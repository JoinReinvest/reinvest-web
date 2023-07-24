import { Avatar } from 'components/Avatar';
import { AccountType, Maybe, PortfolioAuthor } from 'reinvest-app-common/src/types/graphql';

import { DashedLine } from './DashedLine';

interface Props {
  author: Maybe<PortfolioAuthor>;
}

export const ColumnAvatar = ({ author }: Props) => {
  return (
    <div className="flex flex-col items-center gap-16">
      <div>
        <Avatar
          isSizeFixed
          fixedSize="sm"
          src={author?.avatar?.url ?? ''}
          alt={author?.avatar?.initials ?? ''}
          accountType={AccountType.Individual}
        />
      </div>

      <DashedLine />
    </div>
  );
};
