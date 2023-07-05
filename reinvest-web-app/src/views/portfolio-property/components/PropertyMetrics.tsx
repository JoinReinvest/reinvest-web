import { Accordion } from 'components/Accordion';
import { Maybe, Property } from 'reinvest-app-common/src/types/graphql';

import { useInformationModals } from '../providers/InformationModals';
import { TableMetrics } from './TableMetrics';

interface Props {
  property: Maybe<Property>;
}

const SUBTITLE = 'Location';
const TABLE_HEADERS = { key: 'Key Metrics', impact: 'Impact Metrics' };

export const PropertyMetrics = ({ property }: Props) => {
  const modals = useInformationModals();

  return (
    <Accordion
      title={property?.name ?? ''}
      subtitle={SUBTITLE}
    >
      <ul className="flex w-full flex-col md:flex-row">
        <li className="md:basis-1/2">
          <TableMetrics
            header={TABLE_HEADERS.key}
            rows={[
              { label: 'Project Return', value: property?.keyMetrics?.projectReturn ?? '', onAction: modals.toggleIsProjectReturnModalOpen },
              {
                label: 'Structure',
                value: property?.keyMetrics?.structure ?? '',
                onAction: modals.toggleIsStructureModalOpen,
              },
              {
                label: 'Rating',
                value: property?.keyMetrics?.rating ?? '',
                onAction: modals.toggleIsRatingModalOpen,
              },
            ]}
          />
        </li>

        <li className="md:basis-1/2">
          <TableMetrics
            header={TABLE_HEADERS.impact}
            rows={[
              { label: 'Units', value: property?.impactMetrics?.units ?? '', onAction: modals.toggleIsUnitsModalOpen },
              { label: 'Total Project Size', value: property?.impactMetrics?.totalProjectSize ?? '', onAction: modals.toggleIsTotalProjectSizeModalOpen },
              { label: 'Jobs Created', value: property?.impactMetrics?.jobsCreated ?? '', onAction: modals.toggleIsJobsCreatedModalOpen },
            ]}
            hideTopBorderOnMobile
          />
        </li>
      </ul>
    </Accordion>
  );
};
