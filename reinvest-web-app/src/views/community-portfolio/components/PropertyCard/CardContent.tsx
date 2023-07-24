import { Maybe, Property } from 'reinvest-app-common/src/types/graphql';

import { ChipRating } from './ChipRating';
import { ProjectReturn } from './ProjectReturn';
import { PropertyAddress } from './PropertyAddress';

interface Props {
  property: Maybe<Property>;
}

export function CardContent({ property }: Props) {
  const projectReturn = property?.keyMetrics?.projectReturn ?? '';
  const rating = property?.keyMetrics?.rating ?? '';

  return (
    <div className="flex flex-col gap-8 border-x border-b border-x-gray-04 border-b-gray-04 p-16">
      <PropertyAddress address={property?.address} />

      <div className="flex justify-between">
        <ProjectReturn value={projectReturn} />
        <ChipRating rating={rating} />
      </div>
    </div>
  );
}
