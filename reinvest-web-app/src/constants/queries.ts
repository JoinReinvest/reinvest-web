import { MutationMeta, QueryMeta } from 'types/queries';

export const DEFAULT_MUTATION_META: MutationMeta = {
  error: null,
  isLoading: false,
  isSuccess: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reset: () => {},
};

export const DEFAULT_QUERY_META: QueryMeta = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refetch: () => {},
};
