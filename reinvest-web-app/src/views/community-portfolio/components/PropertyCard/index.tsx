import { URL } from 'constants/urls';
import { useRouter } from 'next/router';
import { Maybe, Property } from 'reinvest-app-common/src/types/graphql';

import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';

const PRIORITIZATION_THRESHOLD = 6;

interface Props {
  property: Maybe<Property>;
  propertyIndex: number;
}

export const PropertyCard = ({ property, propertyIndex }: Props) => {
  const router = useRouter();

  function onClick() {
    router.push(`${URL.community_portfolio}/${propertyIndex}`);
  }

  return (
    <div
      role="button"
      onClick={onClick}
      onKeyDown={onClick}
      tabIndex={0}
    >
      <article className="group cursor-pointer">
        <CardHeader
          image={property?.image ?? ''}
          prioritize={propertyIndex < PRIORITIZATION_THRESHOLD}
        />
        <CardContent property={property} />
      </article>
    </div>
  );
};
