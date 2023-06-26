import { Typography } from 'components/Typography';
import { forwardRef, useMemo } from 'react';
import { MAPS_SERVICE } from 'services/maps';
import { Coordinates } from 'types/maps';

interface Props {
  coordinates: Coordinates;
  title: string;
}

export const Map = forwardRef<HTMLIFrameElement, Props>(({ title, coordinates }, ref) => {
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
