import { ErrorResponse } from 'reinvest-app-common/src/services/queries/interfaces';

export interface QueryMeta {
  isLoading: boolean;
  isRefetching: boolean;
  isSuccess: boolean;
  refetch: () => void;
}

export interface MutationMeta {
  error: ErrorResponse | null;
  isLoading: boolean;
  isSuccess: boolean;
  reset: () => void;
}
