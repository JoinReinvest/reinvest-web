import { Typography } from 'components/Typography';
import { PropertyDetails } from 'types/portfolio-property';

import { PropertyCard } from './PropertyCard';

interface Props {
  properties: PropertyDetails[];
}

const TITLE = 'Properties';

export const PropertiesList = ({ properties }: Props) => (
  <section className="flex flex-col gap-24">
    <Typography variant="h5">{TITLE}</Typography>

    <ul className="grid grid-cols-1 gap-24 md:grid-cols-2 lg:grid-cols-3">
      {properties.map(property => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </ul>
  </section>
);
