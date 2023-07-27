import { InfiniteQueryMeta, MutationMeta, QueryMeta } from 'types/queries';

// Defined in milliseconds.
export const DEFAULT_QUERY_REFETCH_INTERVAL = 15_000;

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
  isRefetching: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refetch: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  remove: () => {},
};

export const DEFAULT_INFINITE_QUERY_META: InfiniteQueryMeta = {
  ...DEFAULT_QUERY_META,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fetchNextPage: () => {},
};
