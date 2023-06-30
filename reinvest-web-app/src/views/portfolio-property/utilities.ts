import { Location, Maybe } from 'reinvest-app-common/src/types/graphql';
import { Coordinates } from 'types/maps';

export function parseLocationToCoordinates(location: Maybe<Location>): Coordinates | null {
  if (!location || !location.lat || !location.lng) {
    return null;
  }

  const latitude = parseFloat(location.lat);
  const longitude = parseFloat(location.lng);

  return {
    latitude,
    longitude,
  };
}
