import { NextApiRequest, NextApiResponse } from 'next';
import { addressService } from 'services/addresses';

export default async function handler(apiRequest: NextApiRequest, apiResponse: NextApiResponse) {
  const isMethodAllowed = apiRequest.method !== 'GET';
  const placeId = apiRequest.query.placeId?.toString() || '';

  if (isMethodAllowed) {
    apiResponse.status(405).json({ error: 'Method not allowed' });

    return;
  }

  const address = await addressService.getAddressFromPlaceId(placeId);
  apiResponse.status(200).json(JSON.stringify(address));

  return;
}
