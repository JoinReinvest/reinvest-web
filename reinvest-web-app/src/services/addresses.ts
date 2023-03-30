import { env } from 'env';
import { AddressService } from 'reinvest-app-common/src/services/address';

export { type AddressAsOption } from 'reinvest-app-common/src/services/address';
export const addressService = new AddressService({ apiKey: env.google.maps.apiKey, urls: env.google.maps.urls });
