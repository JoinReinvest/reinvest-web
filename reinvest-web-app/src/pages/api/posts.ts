import { NextApiRequest, NextApiResponse } from 'next';

import { env } from '../../env';
import { fetcher } from '../../services/fetcher';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });

    return;
  }

  const response = await fetcher(`${env.site.url}/api/posts`);

  if (response.errors) {
    res.status(500).json({ error: response.errors[0].message });
  } else {
    res.status(200).json(response.data);
  }

  return;
}
