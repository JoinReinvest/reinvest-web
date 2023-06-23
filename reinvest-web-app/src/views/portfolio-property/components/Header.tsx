import { ButtonBack } from 'components/ButtonBack';
import { URL } from 'constants/urls';
import { useRouter } from 'next/router';
import { Maybe, Property } from 'reinvest-app-common/src/types/graphql';

import { ButtonInvest } from './ButtonInvest';
import { PropertyImages } from './PropertyImages';

interface Props {
  property: Maybe<Property>;
}

export function Header({ property }: Props) {
  const router = useRouter();

  const title = property?.address?.addressLine ?? '';

  function onButtonBackClick() {
    router.push(URL.community_portfolio);
  }

  return (
    <header className="portfolio-property-header">
      <ButtonBack
        className="mb-8 md:mb-0"
        onClick={onButtonBackClick}
      />

      <PropertyImages
        title={title}
        images={property?.gallery ?? []}
      />

      <ButtonInvest className="order-3 mt-24 justify-self-end md:order-2 md:mt-0" />
    </header>
  );
}
