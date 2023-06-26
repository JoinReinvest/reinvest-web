import { Accordion } from 'components/Accordion';
import { Maybe, Property } from 'reinvest-app-common/src/types/graphql';

import { TableMetrics } from './TableMetrics';

interface Props {
  property: Maybe<Property>;
}

const SUBTITLE = 'Location';
const TABLE_HEADERS = { key: 'Key Metrics', impact: 'Impact Metrics' };

export const PropertyMetrics = ({ property }: Props) => (
  <Accordion
    title={property?.name ?? ''}
    subtitle={SUBTITLE}
  >
    <ul className="flex w-full flex-col md:flex-row">
      <li className="md:basis-1/2">
        <TableMetrics
          header={TABLE_HEADERS.key}
          rows={[
            { label: 'Project Return', value: property?.keyMetrics?.projectReturn ?? '' },
            {
              label: 'Structure',
              value: property?.keyMetrics?.structure ?? '',
            },
            {
              label: 'Rating',
              value: property?.keyMetrics?.rating ?? '',
            },
          ]}
        />
      </li>

      <li className="md:basis-1/2">
        <TableMetrics
          header={TABLE_HEADERS.impact}
          rows={[
            { label: 'Units', value: property?.impactMetrics?.units ?? '' },
            { label: 'Total Project Size', value: property?.impactMetrics?.totalProjectSize ?? '' },
            { label: 'Jobs Created', value: property?.impactMetrics?.jobsCreated ?? '' },
          ]}
          hideTopBorderOnMobile
        />
      </li>
    </ul>
  </Accordion>
);
