import { ErrorResponse } from 'reinvest-app-common/src/services/queries/interfaces';

export interface QueryMeta {
  isError: boolean;
  isLoading: boolean;
  isRefetching: boolean;
  isSuccess: boolean;
  refetch: () => void;
  remove: () => void;
}

export interface MutationMeta {
  error: ErrorResponse | null;
  isLoading: boolean;
  isSuccess: boolean;
  reset: () => void;
}

export interface InfiniteQueryMeta extends QueryMeta {
  fetchNextPage: () => void;
  hasNextPage?: boolean;
}
