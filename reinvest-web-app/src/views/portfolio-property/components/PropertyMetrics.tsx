import { Accordion } from 'components/Accordion';
import { PropertyDetails } from 'types/portfolio-property';

import { TableMetrics } from './TableMetrics';

interface Props {
  address: PropertyDetails['address'];
  metrics: PropertyDetails['meta']['metrics'];
}

const SUBTITLE = 'Location';
const TABLE_HEADERS = { key: 'Key Metrics', impact: 'Impact Metrics' };

export function PropertyMetrics({ address, metrics }: Props) {
  const title = [address.city, address.state].filter(Boolean).join(', ');

  return (
    <Accordion
      title={title}
      subtitle={SUBTITLE}
    >
      <ul className="flex w-full flex-col md:flex-row">
        <li className="md:basis-1/2">
          <TableMetrics
            header={TABLE_HEADERS.key}
            rows={[
              { label: 'Project Return', value: metrics.key.projectReturn },
              {
                label: 'Structure',
                value: metrics.key.structure,
              },
              {
                label: 'Rating',
                value: metrics.key.rating,
              },
            ]}
          />
        </li>

        <li className="md:basis-1/2">
          <TableMetrics
            header={TABLE_HEADERS.impact}
            rows={[
              { label: 'Units', value: metrics.impact.units },
              { label: 'Total Project Size', value: metrics.impact.totalProjectSize },
              { label: 'Jobs Created', value: metrics.impact.jobsCreated },
            ]}
            hideTopBorderOnMobile
          />
        </li>
      </ul>
    </Accordion>
  );
}
