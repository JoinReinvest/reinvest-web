export const fetcher = (url: string) =>
  fetch(url).then(async res => {
    const result = await res.json();

    return typeof result === 'string' ? JSON.parse(result) : result;
  });
