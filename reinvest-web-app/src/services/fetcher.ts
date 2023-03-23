import fetch from 'node-fetch';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetcher = (url: string, method = 'GET', body: URLSearchParams | any) =>
  fetch(url, { method, body }).then(async res => {
    try {
      const result = await res.json();

      return typeof result === 'string' ? JSON.parse(result) : result;
    } catch {
      return res;
    }
  });
