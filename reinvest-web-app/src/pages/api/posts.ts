import { env } from 'env';
import { NextApiRequest, NextApiResponse } from 'next';
import { makeRequest } from 'services/api-request';
import { GetPostsResponse } from 'types/site-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });

    return;
  }

  try {
    const url = `${env.site.url}/api/posts`;
    const response = await makeRequest<GetPostsResponse>({ url, method: 'GET' });
    const parsedData: GetPostsResponse = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    const hasSucceded = !!parsedData.success;

    if (hasSucceded) {
      res.status(200).json(parsedData);

      return;
    }

    res.status(500).json({ error: response.statusText });
  } catch (error) {
    res.status(500).json({ error });
  }

  return;
}
