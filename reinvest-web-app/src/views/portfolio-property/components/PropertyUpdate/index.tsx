import { Maybe, PortfolioUpdate } from 'reinvest-app-common/src/types/graphql';

import { ColumnAvatar } from './ColumnAvatar';
import { ColumnContent } from './ColumnContent';

interface Props {
  update: Maybe<PortfolioUpdate>;
  isPriority?: boolean;
}

export const PropertyUpdate = ({ update, isPriority }: Props) => (
  <>
    {update?.author && (
      <li className="flex w-315 min-w-full gap-16">
        <ColumnAvatar author={update?.author} />

        <ColumnContent
          update={update}
          prioritizeImage={isPriority}
        />
      </li>
    )}
  </>
);
