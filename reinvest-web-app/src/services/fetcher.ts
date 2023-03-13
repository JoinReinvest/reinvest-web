import axios from 'axios';

export const fetcher = async (url: string) => {
  const response = await axios.get(url, { responseType: 'json' });

  return JSON.parse(response.data);
};
