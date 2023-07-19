import { Avatar } from 'components/Avatar';
import { useMemo } from 'react';
import { AccountType, Maybe, PortfolioAuthor } from 'reinvest-app-common/src/types/graphql';

import { DashedLine } from './DashedLine';

interface Props {
  author: Maybe<PortfolioAuthor>;
}

export const ColumnAvatar = ({ author }: Props) => {
  // TO-DO: Deprecate retrieving the initials on our own when
  // `author.avatar` returns initials.
  const initials = useMemo(() => {
    if (!author?.name) return '';

    const nameParts = author?.name.split(' ');
    const validNameParts = nameParts.filter(Boolean);
    const initials = validNameParts.map(part => part.charAt(0).toUpperCase());

    return initials.join('');
  }, [author?.name]);

  return (
    <div className="flex flex-col items-center gap-16">
      <div>
        <Avatar
          isSizeFixed
          fixedSize="sm"
          src={author?.avatar?.url ?? ''}
          alt={initials}
          accountType={AccountType.Individual}
        />
      </div>

      <DashedLine />
    </div>
  );
};
