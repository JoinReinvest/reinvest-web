import cx from 'classnames';
import { Typography } from 'components/Typography';
import { PropertyDetails } from 'types/portfolio-property';

import { PropertyUpdate } from './PropertyUpdate';

interface Props {
  updates: PropertyDetails['updates'];
  className?: string;
}

const TITLE = 'Updates';

export const SectionUpdates = ({ updates, className }: Props) => (
  <section className={cx('flex flex-col gap-16', className)}>
    <Typography variant="h5">{TITLE}</Typography>

    <ul className="flex flex-col gap-24">
      {updates.map((update, index) => (
        <PropertyUpdate
          key={index}
          update={update}
        />
      ))}
    </ul>
  </section>
);
