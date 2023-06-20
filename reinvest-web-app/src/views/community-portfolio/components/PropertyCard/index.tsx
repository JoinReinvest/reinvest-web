import { URL } from 'constants/urls';
import { useRouter } from 'next/router';
import { PropertyDetails } from 'types/portfolio-property';

import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';

interface Props {
  property: PropertyDetails;
}

export const PropertyCard = ({ property }: Props) => {
  const router = useRouter();

  function onClick() {
    router.push(`${URL.community_portfolio}/${property.id}`);
  }

  return (
    <div
      role="button"
      onClick={onClick}
      onKeyDown={onClick}
      tabIndex={0}
    >
      <article className="group cursor-pointer">
        <CardHeader image={property.meta.thumbnail} />
        <CardContent property={property} />
      </article>
    </div>
  );
};
