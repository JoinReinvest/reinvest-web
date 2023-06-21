import { Map } from 'components/Map';
import { Typography } from 'components/Typography';
import { PropertyDetails } from 'types/portfolio-property';

import { PropertyCharacteristicList } from './PropertyCharasteristicList';

interface Props {
  property: PropertyDetails;
}

const TITLE = 'About the Neighborhood';

export const SectionNeighborhood = ({ property }: Props) => (
  <section className="flex flex-col gap-16 md:grow">
    <Typography variant="h5">{TITLE}</Typography>

    <div className="flex flex-col gap-16 md:basis-3/4 md:gap-21">
      <Map
        address={property.address}
        coordinates={property.location}
      />

      <PropertyCharacteristicList items={property.characteristics} />
    </div>
  </section>
);
