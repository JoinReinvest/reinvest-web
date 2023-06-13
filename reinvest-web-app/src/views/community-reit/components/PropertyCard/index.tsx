import { PropertyDetails } from '../../interfaces';
import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';

interface Props {
  property: PropertyDetails;
}

export const PropertyCard = ({ property }: Props) => (
  <article className="cursor-pointer">
    <CardHeader image={property.meta.thumbnail} />
    <CardContent property={property} />
  </article>
);
