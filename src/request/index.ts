/* eslint-disable */
// https://github.com/axios/axios#interceptors
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import { Notification } from 'element-ui';

import { getAppInfo, isApp, isNativeFuncExist} from '@/utils/native.ts'

const OPTION_DEFAULT: AxiosRequestConfig = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  responseType: 'json',
  validateStatus(status) {
    return status >= 200;
  },
};

export default class Network {
    public requestInstance = axios.create({
      withCredentials: true,
      ...OPTION_DEFAULT,
    });

    public get = this.requestQuick('GET');

    public getEx = this.requestQuickEx('GET');

    public post = this.requestQuick('POST');

    public put = this.requestQuick('PUT');

    public delete = this.requestQuick('DELETE');

    // 服务端请求用的
    public Cookie: string = '';

    public req: any = {
      _logger: {},
    };

    constructor() {
      this.createInstance();
    }

    public createInstance(cookie?: string) {
      const option: any = OPTION_DEFAULT;
      if (cookie) {
        this.requestInstance = axios.create({
          ...option,
          headers: { ...option.headers, cookie },
        });
      }
      if (!cookie) {
        this.requestInstance = axios.create({ ...option, withCredentials: true });
      }
      if (isApp() && isNativeFuncExist()) {
        this.requestInstance.interceptors.request.use(async (axiosConfig) => {
          // APP => 4.1 的获取方式
          if (isApp() && isNativeFuncExist()) {
            const data = await getAppInfo();
            axiosConfig.headers['USER_TOKEN'] = data.USER_TOKEN;
            axiosConfig.headers['x-sdk-info'] = data.xSDKInfo;
            axiosConfig.headers['lang'] = data.lang;
          }
          return axiosConfig;
        });
      }
      this.requestInstance.interceptors.request.use(this.onRequestBefore);
      this.requestInstance.interceptors.response.use(this.onResponse);
      return this.requestInstance;
    }

    // 发起请求
    public request(option: AxiosRequestConfig = OPTION_DEFAULT) {
      // 请求前
      if (!this.onRequestBefore(option)) {
        throw new Error('network request options illegality please check the request');
      }
      try {
        if (process.env.VUE_APP_BUILD_WAY === 'service') {
          this.createInstance(`USER_TOKEN=${(this.Cookie as any).USER_TOKEN};`);
        }
        return this.requestInstance.request(option);
      } catch (e) {
        return this.onNetworkError(option, e);
      }
    }

    // 网络请求前
    public onRequestBefore = (config: AxiosRequestConfig) => {
      // TODO validate with the request options
      this.req._logger.start && this.req._logger.start(`Ajax_request_${config.url}`);
      return config;
    };

    // 响应后
    public onResponse = (response: AxiosResponse) => {
      this.req._logger.end && this.req._logger.end(`Ajax_request_${response.config.url}`);
      if (response.data.code) {
        Notification({
          title: 'failure',
          message: `${response.data.message} `,
          type: 'error'
        });
        this.req._logger.error
            && this.req._logger.error(`Ajax request failed ${response.config.url} error ${response.data.code}`);
        if (response.data) {
          return Promise.reject(response.data);
        }
        return Promise.reject(new Error(`RequestStatus: ${response.status} ${response.statusText}`));
      }
      return Promise.resolve(response.data);
    }

    // 网络请求发生错误
    public onNetworkError(option: AxiosRequestConfig, e: Error) {
      // TODO deal the network error with the request options and error message
      console.log('error', e);
      return Promise.reject(e);
    }

    // 请求正常响应 但是返回状态异常
    public onInsideError(response: AxiosResponse) {
      // TODO deal the network error with the request options and response
      return Promise.reject(new Error(`请求报错: ${JSON.stringify(response.data)}`));
    }

    public requestQuick(type: string) {
      return (url: string = '/', option?: AxiosRequestConfig) => new Promise((resolve, reject) => {
        this.request({ ...option, url, method: type }).then(
          (data: any) => resolve(data.data),
          e => reject(e.data ? e.data : e),
        );
      });
    }

    public requestQuickEx(type: string) {
      return (url: string = '/', option?: AxiosRequestConfig) => this.request({ ...option, url, method: type });
    }
}

export const network = new Network();
export const get = network.get;
export const getEx = network.getEx;
export const post = network.post;
export const put = network.put;
// 直接export delete 会报错 delete 关键词来的
export const deleteFN = network.delete;
