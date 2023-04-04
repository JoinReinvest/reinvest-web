import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

type GetRequest = AxiosRequestConfig | null;
type PrimitiveSWRResponse<Data, Error> = Pick<SWRResponse<AxiosResponse<Data>, AxiosError<Error>>, 'isValidating' | 'error' | 'mutate' | 'isLoading'>;
type Config<Data = unknown, Error = unknown> = SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>;

interface Return<Data, Error> extends PrimitiveSWRResponse<Data, Error> {
  data?: Data;
  response?: AxiosResponse<Data>;
}

export const useFetch = <Data = unknown, Error = unknown>(request: GetRequest, config: Config<Data, Error> = {}): Return<Data, Error> => {
  const {
    data: response,
    error,
    isValidating,
    isLoading,
    mutate,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(request && JSON.stringify(request), () => axios.request<Data>(request!), {
    ...config,
  });

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    isLoading,
    mutate,
  };
};
