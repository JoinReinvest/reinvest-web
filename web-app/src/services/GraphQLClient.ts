import { env } from 'env';
import { GraphQLClient as PrimitiveGraphQLClient } from 'graphql-request';
import { useSession } from 'next-auth/react';

export const GraphQLClient = () => {
  const { data: session } = useSession();

  const token = session?.user?.token;

  return new PrimitiveGraphQLClient(env.apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
