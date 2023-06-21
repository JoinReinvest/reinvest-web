import { Typography } from 'components/Typography';
import { Maybe, Property } from 'reinvest-app-common/src/types/graphql';

import { PropertyCard } from './PropertyCard';

interface Props {
  properties: Maybe<Property>[];
}

const TITLE = 'Properties';

export const PropertiesList = ({ properties }: Props) => (
  <section className="flex flex-col gap-24">
    <Typography variant="h5">{TITLE}</Typography>

    <ul className="grid grid-cols-1 gap-24 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property, index) => (
        <PropertyCard
          key={property?.name}
          property={property}
          propertyIndex={index}
        />
      ))}
    </ul>
  </section>
);
