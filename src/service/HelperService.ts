import { getLocalStorage } from "util/CommonUtil";
import { LOCAL_STORAGE } from "util/Constant";

class HelperService {
  getUserInfo() {
    if (getLocalStorage(LOCAL_STORAGE.USER_INFO))
      return JSON.parse(getLocalStorage(LOCAL_STORAGE.USER_INFO));

    return false;
  }
  getHeadersWithAuth() {
    return {
      Authorization: "Bearer " + this.getUserInfo().accessToken,
      "content-type": "application/json",
    };
  }
  getHeadersWithAuthWithMultipartFormData() {
    return {
      Authorization: "Bearer " + this.getUserInfo().accessToken,
      "content-type": "multipart/form-data",
    };
  }
  getHeaders(contentType?: string): object {
    return {
      "content-type": contentType ?? "application/json",
    };
  }
}

export default new HelperService();
