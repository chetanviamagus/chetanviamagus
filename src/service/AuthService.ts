import UnAuthorized from "component/UnAuthorized";
import {
  IBody,
  ILoginService,
  IResetPassword,
  IResetPasswordByOTP,
  ISignUpService,
  IVerifyOTP,
} from "interface/service";
import React from "react";
import { createRoot } from "react-dom/client";
import { getLocalStorage, setLocalStorage } from "util/CommonUtil";
import { LOCAL_STORAGE, MIME_TYPE } from "util/Constant";
import BaseApiService from "./BaseApiService";

const DEFAULT_PATH = "/auth/pub";
const DEFAULT_PATH_SIGNUP = "/signup";
const DEFAULT_PATH_FORGOT_PASSWORD = "/password";

class AuthService extends BaseApiService {
  constructor(props?: any) {
    super(props);

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    this.getAxios().interceptors.request.use(
      function (config) {
        console.log("Making API Request...");
        // Do something before request is sent
        return config;
      },
      function (error) {
        console.log("API Request ERROR...");
        // Do something with request error
        return Promise.reject(error);
      }
    );
    console.log("Creating interceptor...");
    // Add a response interceptor
    this.getAxios().interceptors.response.use(
      (response) => {
        console.log("API Response received...");
        // Do something with response data
        return response;
      },
      (error) => {
        const originalReq = error.config;
        if (typeof window === "undefined") {
          console.log("do nothing");
        } else {
          console.log("API Response ERROR...");
          if (error.response.status === 401 && error.config && !error.config.___retry) {
            originalReq.___retry = true;
            console.log("Token Expired...");
            if (!originalReq.url?.includes?.("/login")) {
              return new Promise((resolve, reject) => {
                console.log("Trying renew auth...");
                const userInfo = JSON.parse(getLocalStorage(LOCAL_STORAGE.USER_INFO));
                const refreshToken = userInfo.refreshToken;
                const url = this.getDefaultApiUrl();
                const finalUrl = `${url}${DEFAULT_PATH}/user/token/renew`;
                const res = fetch(finalUrl, {
                  method: "post",
                  headers: {
                    "Content-Type": "application/json",
                    "x-refresh-token": refreshToken,
                  },
                  body: JSON.stringify({
                    username: "customeradmin@kaiju-node.com",
                    isAdmin: false,
                    refreshToken: refreshToken,
                  }),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    console.log(res);
                    const userInfo = JSON.parse(getLocalStorage(LOCAL_STORAGE.USER_INFO));
                    userInfo.accessToken = res.accessToken;
                    if (res.accessToken) {
                      setLocalStorage(LOCAL_STORAGE.USER_INFO, JSON.stringify(userInfo));
                    }
                    const newHeaders = {
                      Authorization: "Bearer " + res.accessToken,
                    };
                    originalReq.headers = {
                      ...originalReq.headers,
                      ...newHeaders,
                    };
                    return _this.getAxios()(originalReq);
                  })
                  .catch((err) => {
                    console.log(err);
                    return Promise.reject(err);
                  });

                resolve(res);
              });
            } else {
              return Promise.reject(error);
            }
          } else if (
            //failed after refresh...
            error.config &&
            error.config.___retry &&
            error.response.status === 401
          ) {
            const container = document.getElementById("errorDiv12399");
            const errorContainerRoot = createRoot(container!);
            errorContainerRoot.render(React.createElement(UnAuthorized));
          }
        }
        return Promise.reject(error);
      }
    );
  }

  login(credentials: ILoginService) {
    const url = `${DEFAULT_PATH}/user/login`;
    return this.makePostRequest(url, credentials);
  }

  logOut() {
    localStorage.removeItem(LOCAL_STORAGE.USER_INFO);
    return;
  }

  signUp(payload: ISignUpService) {
    const endPoint = DEFAULT_PATH_SIGNUP;
    return this.makePostRequest(endPoint, payload);
  }
  resendSMS(email: string) {
    const endPoint = DEFAULT_PATH_SIGNUP;
    const headers = {
      "content-type": MIME_TYPE.PLAIN,
    };
    return this.axiosConfig(endPoint, "put", headers, email);
  }
  verifyToken(token: string) {
    const endPoint = `${DEFAULT_PATH_SIGNUP}/email/verify/${token}`;
    return this.makePostRequest(endPoint);
  }

  generateToken(code: string) {
    const baseUrl = DEFAULT_PATH;
    const url = `${baseUrl}/google/token?&code=${code}`;
    return this.makeGetRequest(url);
  }

  sendResetPasswordLink(email: string) {
    const endPoint = `${DEFAULT_PATH_FORGOT_PASSWORD}/reset`;
    const headers = {
      "content-type": MIME_TYPE.PLAIN,
    };
    return this.axiosConfig(endPoint, "post", headers, email);
  }
  resetPassword(object: IResetPassword) {
    const endPoint = `${DEFAULT_PATH_FORGOT_PASSWORD}/reset`;
    return this.makePutRequest(endPoint, object);
  }

  resetPasswordByOTP(object: IResetPasswordByOTP) {
    const endPoint = `${DEFAULT_PATH}/otp/send`;
    return this.makePostRequest(endPoint, object);
  }

  verifyOTP(object: IVerifyOTP, data: IBody) {
    const endPoint = `${DEFAULT_PATH}/reset/password`;
    const headers = {
      Authorization: `Basic ${btoa(data.username + ":" + data.password)}`,
    };
    return this.makePostRequest(endPoint, object, headers);
  }
}

export default new AuthService();
