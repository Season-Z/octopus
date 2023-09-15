export type ENV_KEY = 'dev' | 'test' | 'uat' | 'prod';
type ConfigMap = Record<ENV_KEY, string>;
interface MyResponse {
  code: string;
  data?: any;
  success: boolean;
}

import axios, { AxiosResponse } from 'axios';

const API_HOST: ConfigMap = {
  dev: 'http://max-beluga-vpc.dev.sunmi.com',
  test: 'http://max-beluga-vpc.test.sunmi.com',
  uat: 'http://max-beluga-vpc.uat.sunmi.com',
  prod: 'http://max-beluga-vpc.sunmi.com',
};

/**
 * 用于请求内部api的方法
 */
export const createFetch = (env: ENV_KEY) => {
  const fetch = axios.create({
    baseURL: API_HOST[env],
    transformRequest: [(data) => JSON.stringify(data)],
  });

  // request拦截器
  fetch.interceptors.request.use(
    async (config) => {
      config.headers = {
        'Content-Type': 'application/json',
        'x-language': 'en-US'
      };
      return config;
    },
    (reason) => reason,
  );
  // response拦截器
  fetch.interceptors.response.use(
    (res: AxiosResponse<MyResponse>) => {
      if (res.data.code == '1') {
        return res.data;
      } else {
        return Promise.reject(res.data);
      }
    },
    (reason) => Promise.reject(reason),
  );
  return fetch;
};
