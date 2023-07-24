import cx from 'classnames';
import { Typography } from 'components/Typography';
import { Maybe, PortfolioUpdate } from 'reinvest-app-common/src/types/graphql';

import { PropertyUpdate } from './PropertyUpdate';

interface Props {
  updates: Maybe<PortfolioUpdate>[];
  className?: string;
}

const TITLE = 'Updates';
const PRIORITY_THRESHOLD = 3;

export const SectionUpdates = ({ updates, className }: Props) => (
  <section className={cx('flex flex-col gap-16', className)}>
    <Typography variant="h5">{TITLE}</Typography>

    <ul className="flex flex-col gap-24">
      {updates.map((update, index) => (
        <PropertyUpdate
          key={index}
          update={update}
          isPriority={index <= PRIORITY_THRESHOLD}
        />
      ))}
    </ul>
  </section>
);
