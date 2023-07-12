import { URL } from 'constants/urls';
import Link from 'next/link';
import { useMemo } from 'react';
import { Maybe, Property } from 'reinvest-app-common/src/types/graphql';

import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';

const PRIORITIZATION_THRESHOLD = 6;

interface Props {
  property: Maybe<Property>;
  propertyIndex: number;
}

export const PropertyCard = ({ property, propertyIndex }: Props) => {
  const route = useMemo(() => `${URL.community_portfolio}/${propertyIndex}`, [propertyIndex]);

  return (
    <Link href={route}>
      <article className="group cursor-pointer">
        <CardHeader
          image={property?.image ?? ''}
          prioritize={propertyIndex < PRIORITIZATION_THRESHOLD}
        />
        <CardContent property={property} />
      </article>
    </Link>
  );
};
