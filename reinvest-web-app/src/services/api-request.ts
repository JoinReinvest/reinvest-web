import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const makeRequest = async <Response = unknown, Config = unknown>({
  url,
  method = 'GET',
  data,
  ...parameters
}: AxiosRequestConfig<Config>): Promise<AxiosResponse<Response>> => {
  const response = await axios.request<Response>({
    url,
    method,
    data,
    ...parameters,
  });

  try {
    return response;
  } catch {
    return response;
  }
};
