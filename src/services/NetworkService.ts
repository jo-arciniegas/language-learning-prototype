import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';

export default class NetworkService {

  baseURL: string | undefined;
  client: AxiosInstance | undefined;
  token: string | undefined;
  onUnauthorized: (() => void) | undefined;

  constructor(baseURL: string, headers: object, onUnauthorized?: () => void) {
    this.onUnauthorized = onUnauthorized;
    this.initClient(baseURL, headers);
  }

  initClient(baseURL: string, headers: object) {
    this.baseURL = baseURL;
    const baseHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    Object.assign(baseHeaders, headers);
    this.client = axios.create({
      baseURL,
      headers: baseHeaders,
    //   paramsSerializer: (params: any) => qs.stringify(params, { indices: true }),
    });
    this.client.interceptors.response.use(
      (response) => this.responseHandler(response),
      (error) => this.errorHandler(error),
    );
    this.token && this.setAccessToken(this.token);
  }

  setBaseUrl(baseURL: string) {
    this.baseURL = baseURL;
    if(this.client){
        this.client.defaults.baseURL = baseURL;
    }
  }

  setHeaders(headers: object) {
    const baseHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    Object.assign(baseHeaders, headers);
    if(this.client){
        this.client.defaults.headers.common = baseHeaders;
    }
    this.token && this.setAccessToken(this.token);
  }

  responseHandler(response: any) {
    if (response.status === 200 || response.status === 201) {
      // console.log('response success: ' + JSON.stringify(response.data));
      return response.data;
    }
    return response;
  }

  errorHandler(error: any) {
    if (error.response) {
      if (error.response.status === 422) {
        if (error.response.data) {
          
        }
      }

      if (error.response.status === 401) {
        this.onUnauthorized && this.onUnauthorized();
      }

      if (error.response.status === 404) {
      }

      if (error.response.status === 403) {
        
      }

      if (error.response.status === 409) {
      }
    }
    const errorResponse = error.response;
    // console.log('response error: ' + JSON.stringify(errorResponse));
    return errorResponse ? Promise.reject(errorResponse) : Promise.reject(error);
  }

  setAccessToken(token: string) {
    this.token = token;
    if(this.client){
        this.client.defaults.headers.common.authorization = `Bearer ${token}`;
    }
  }

  clearAccessToken() {
    this.token = undefined;
    if(this.client){
        delete this.client.defaults.headers.common.authorization;
    }
  }

  async get(url: string, config?: AxiosRequestConfig) {
    if (!this.baseURL) {
      console.log('Service error: No Base Url');
      return null;
    }
    try {
      const response = await this.client?.get(url, config);
      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async post(url: string, data: any, config?: AxiosRequestConfig) {
    if (!this.baseURL) {
      console.log('Service error: No Base Url');
      return null;
    }
    try {
      const response = await this.client?.post(url, data, config);
      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async put(url: string, data: any, config?: AxiosRequestConfig) {
    if (!this.baseURL) {
      console.log('Service error: No Base Url');
      return null;
    }
    try {
      const response = await this.client?.put(url, data, config);
      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }
}
