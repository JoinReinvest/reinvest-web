import { NextApiRequest, NextApiResponse } from 'next';
import { addressService } from 'services/addresses';

export default async function handler(apiRequest: NextApiRequest, apiResponse: NextApiResponse) {
  const isMethodAllowed = apiRequest.method !== 'GET';
  const query = apiRequest.query.query?.toString() || '';

  if (isMethodAllowed) {
    apiResponse.status(405).json({ error: 'Method not allowed' });

    return;
  }

  const suggestions = await addressService.getSuggestions(query);
  apiResponse.status(200).json(JSON.stringify(suggestions));

  return;
}
