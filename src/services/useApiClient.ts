import { getApiClient } from './getApiClient';

export const useApiClient = (token: string) => {
  return getApiClient(token);
};
