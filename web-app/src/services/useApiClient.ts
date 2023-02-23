import { useSession } from 'next-auth/react';

import { getApiClient } from './getApiClient';

export const useApiClient = () => {
  const { data: session } = useSession();

  const token = session?.token;

  return getApiClient(token);
};
