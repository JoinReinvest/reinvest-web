import { env } from 'env';
import OpenLocationCode from 'open-location-code-typescript';
import { Coordinates } from 'types/maps';

class MapService {
  private readonly BASE_URL = env.google.maps.urls.embedded;
  /** https://developers.google.com/maps/documentation/embed/embedding-map#choosing_map_modes */
  private readonly mapMode = 'place';

  public getStaticMapUrl(coordinates: Coordinates) {
    const url = this.getUrl();
    const parameters = this.getParameters(coordinates);

    return [url, parameters].join('?');
  }

  private getUrl = () => {
    const baseUrlEndsWithSlash = this.BASE_URL.endsWith('/');

    return [this.BASE_URL, this.mapMode].join(baseUrlEndsWithSlash ? '' : '/');
  };

  private getParameters = (coordinates: Coordinates): string => {
    const markerLocation = this.convertCoordinates(coordinates);

    const queries = {
      key: env.google.maps.apiKey,
      q: markerLocation,
      language: 'en_US',
    };

    return new URLSearchParams(queries).toString();
  };

  /** Transform coordinates (latitude & longitude) to an open location code. */
  private convertCoordinates = ({ latitude, longitude }: Coordinates) => {
    return OpenLocationCode.encode(latitude, longitude);
  };
}

export const MAPS_SERVICE = new MapService();
