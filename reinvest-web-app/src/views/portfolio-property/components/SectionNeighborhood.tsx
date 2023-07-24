import { Map } from 'components/Map';
import { Typography } from 'components/Typography';
import { Maybe, Property } from 'reinvest-app-common/src/types/graphql';

import { parseLocationToCoordinates } from '../utilities';
import { PropertyCharacteristicList } from './PropertyCharasteristicList';

interface Props {
  property: Maybe<Property>;
}

const TITLE = 'About the Neighborhood';

export function SectionNeighborhood({ property }: Props) {
  const coordinates = property?.location && parseLocationToCoordinates(property?.location);

  return (
    <section className="flex flex-col gap-16 md:grow">
      <Typography variant="h5">{TITLE}</Typography>

      <div className="flex flex-col gap-16 md:basis-3/4 md:gap-21">
        {property?.name && coordinates && (
          <Map
            title={property?.name}
            coordinates={coordinates}
          />
        )}

        {property?.POIs && <PropertyCharacteristicList items={property?.POIs} />}
      </div>
    </section>
  );
}
