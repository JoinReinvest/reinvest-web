import { env } from 'env';
import { AddressAsOption, AddressService } from 'reinvest-app-common/src/services/address';
import { makeRequest } from 'services/api-request';

export { type AddressAsOption } from 'reinvest-app-common/src/services/address';
export const addressService = new AddressService({ apiKey: env.google.maps.apiKey, urls: env.google.maps.urls });

export const loadAddressesSuggestions = async (query: string): Promise<AddressAsOption[]> => {
  const url = `/api/address/suggestions/${query}`;
  const { data } = await makeRequest<AddressAsOption[]>({ url, method: 'GET' });

  return typeof data === 'string' ? JSON.parse(data) : [];
};
