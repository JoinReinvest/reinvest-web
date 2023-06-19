import { Typography } from 'components/Typography';
import { forwardRef, useMemo } from 'react';
import { Address } from 'reinvest-app-common/src/types/graphql';
import { MAPS_SERVICE } from 'services/maps';
import { Coordinates } from 'types/maps';

interface Props {
  address: Address;
  coordinates: Coordinates;
}

export const Map = forwardRef<HTMLIFrameElement, Props>(({ address, coordinates }, ref) => {
  const title = useMemo(() => [address.addressLine1, address.city, address.state, address.zip].filter(Boolean).join(', '), [address]);
  const url = useMemo(() => MAPS_SERVICE.getStaticMapUrl(coordinates), [coordinates]);

  return (
    <figure>
      <iframe
        title={`Map for ${title}`}
        ref={ref}
        className="h-212 border-0 md:h-364"
        width="100%"
        height="250"
        frameBorder="0"
        referrerPolicy="no-referrer-when-downgrade"
        src={url}
        allowFullScreen
      />

      <figcaption className="overflow-hidden text-ellipsis border-x border-b border-gray-04 px-16 py-12">
        <Typography variant="bonus-heading">{title}</Typography>
      </figcaption>
    </figure>
  );
});
