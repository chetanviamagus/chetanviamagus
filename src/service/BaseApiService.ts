import axios from "axios";
import { getEnvVariableValue } from "util/CommonUtil";
import HelperService from "./HelperService";

type HTTP_METHODS = "get" | "post" | "put" | "delete" | "patch";

const DEFAULT_API_PATH = getEnvVariableValue("VITE_BASE_API_URL");

class BaseApiService {
  constructor(props?: any) {
    console.log("BaseApiService");
  }

  getDefaultApiUrl() {
    return DEFAULT_API_PATH;
  }

  getAxios() {
    return axios;
  }

  makeGetRequestWithAuth(url: string, headers?: any, responseType?: any) {
    url = `${DEFAULT_API_PATH}${url}`;
    const headersObj = {
      headers: { ...HelperService.getHeadersWithAuth(), ...(headers || {}) },
      ...(responseType ? { responseType: responseType } : {}),
    };
    return this.getAxios().get(url, headersObj);
  }

  makeGetRequest(url: string, headers?: any) {
    url = `${DEFAULT_API_PATH}${url}`;
    const headersObj = {
      headers: { ...(headers || {}) },
    };
    return this.getAxios().get(url, headersObj);
  }

  makePostRequestWithAuth(url: string, body?: any, headers?: any, responseType?: any) {
    url = `${DEFAULT_API_PATH}${url}`;
    const headersObj = {
      headers: { ...HelperService.getHeadersWithAuth(), ...(headers || {}) },
      ...(responseType ? { responseType: responseType } : {}),
    };
    return this.getAxios().post(url, body, headersObj);
  }

  makePostRequestWithAuthForMultiPartFormData(url: string, body?: any, headers?: any) {
    url = `${DEFAULT_API_PATH}${url}`;
    const headersObj = {
      headers: { ...HelperService.getHeadersWithAuthWithMultipartFormData(), ...(headers || {}) },
    };
    return this.getAxios().post(url, body, headersObj);
  }

  makePostRequestWithAuthWithoutObject(url: string, body?: any, headers?: any) {
    url = `${DEFAULT_API_PATH}${url}`;
    const headersObj = {
      headers: { ...HelperService.getHeadersWithAuth(), ...(headers || {}) },
    };
    return this.getAxios().post(url, body, headersObj);
  }

  makePostRequest(url: string, body?: any, headers?: any) {
    url = `${DEFAULT_API_PATH}${url}`;
    const headersObj = {
      headers: { ...(headers || {}) },
    };
    return this.getAxios().post(url, body, headersObj);
  }

  makePutRequestWithAuth(url: string, body?: any, headers?: any) {
    url = `${DEFAULT_API_PATH}${url}`;
    const headersObj = {
      headers: { ...HelperService.getHeadersWithAuth(), ...(headers || {}) },
    };
    return this.getAxios().put(url, body, headersObj);
  }
  makePatchRequestWithAuth(url: string, body?: any, headers?: any) {
    url = `${DEFAULT_API_PATH}${url}`;
    const headersObj = {
      headers: { ...HelperService.getHeadersWithAuth(), ...(headers || {}) },
    };
    return this.getAxios().patch(url, body, headersObj);
  }
  makePutRequest(url: string, body?: any, headers?: any) {
    url = `${DEFAULT_API_PATH}${url}`;
    const headersObj = {
      headers: { ...(headers || {}) },
    };
    return this.getAxios().put(url, body, headersObj);
  }

  makeDeleteRequestWithAuth(url: string, headers?: any) {
    url = `${DEFAULT_API_PATH}${url}`;
    const headersObj = {
      headers: { ...HelperService.getHeadersWithAuth(), ...(headers || {}) },
    };
    return this.getAxios().delete(url, headersObj);
  }
  makeDeleteRequest(url: string, headers?: any) {
    url = `${DEFAULT_API_PATH}${url}`;
    const headersObj = {
      headers: { ...(headers || {}) },
    };
    return this.getAxios().delete(url, headersObj);
  }

  axiosConfig(
    url: string,
    method: HTTP_METHODS,
    headers: any = HelperService.getHeaders() ?? undefined,
    data?: any
  ) {
    const config = {
      url: `${DEFAULT_API_PATH}${url}`,
      method,
      headers: {
        ...headers,
      },
      data: data,
    };
    //@ts-ignore :we will fix it later: Need to fix this
    return axios(config);
  }
  axiosConfigWithAuth(url: string, method: HTTP_METHODS, headers?: any, data?: any) {
    let config = {};
    config = {
      url: `${DEFAULT_API_PATH}${url}`,
      method,
      headers: { ...HelperService.getHeadersWithAuth(), ...(headers || {}) },
      data: data,
    };
    //@ts-ignore :we will fix it later: Need to fix this
    return axios(config);
  }
}

export default BaseApiService;
