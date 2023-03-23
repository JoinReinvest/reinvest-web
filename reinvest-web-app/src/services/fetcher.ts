import fetch from 'node-fetch';

export const fetcher = (url: string, method = 'GET', body: URLSearchParams | undefined = undefined) =>
  fetch(url, { method, body }).then(async res => {
    const result = await res.json();

    return typeof result === 'string' ? JSON.parse(result) : result;
  });
