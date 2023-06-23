import { URL } from 'constants/urls';
import { useRouter } from 'next/router';
import { Maybe, Property } from 'reinvest-app-common/src/types/graphql';

import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';

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
        <CardHeader image={property?.image ?? ''} />
        <CardContent property={property} />
      </article>
    </div>
  );
};
