import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const makeRequest = async <Response = unknown, Config = unknown>({
  url,
  method = 'GET',
  data,
  ...parameters
}: AxiosRequestConfig<Config>): Promise<AxiosResponse<Response>> => {
  try {
    return axios.request<Response>({
      url,
      method,
      data,
      ...parameters,
    });
  } catch (error) {
    /* eslint-disable no-console */
    console.error(error);
  }

  return Promise.reject();
};
