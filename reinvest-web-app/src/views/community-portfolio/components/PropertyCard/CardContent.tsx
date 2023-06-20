import { PropertyDetails } from 'types/portfolio-property';

import { ChipRating } from './ChipRating';
import { ProjectReturn } from './ProjectReturn';
import { PropertyAddress } from './PropertyAddress';

interface Props {
  property: PropertyDetails;
}

export function CardContent({ property }: Props) {
  const projectReturn = property.meta.metrics.key.projectReturn;
  const rating = property.meta.metrics.key.rating;

  return (
    <div className="flex flex-col gap-8 border-x border-b border-x-gray-04 border-b-gray-04 p-16">
      <PropertyAddress address={property.address} />

      <div className="flex justify-between">
        <ProjectReturn value={projectReturn} />
        <ChipRating rating={rating} />
      </div>
    </div>
  );
}
