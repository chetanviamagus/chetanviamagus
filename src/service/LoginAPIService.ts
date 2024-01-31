import { ActionType, ScreenRenderStatus } from "../util/CommonConstant";
import {
  getEnvVariableValue,
  parseStandardAPIErrorMessage,
  validateGetAPIResponse,
} from "../util/CommonUtil";
import BaseApiService from "./BaseApiService";

import { LoginModel, defaultLoginModel } from "../model/LoginModel";
import LoginConfig from "model/LoginConfig";
import { get } from "http";

const DEFAULT_PATH = "/custom/api/generic/entity";

class LoginAPIService extends BaseApiService {
  // Convert a LoginModel object to the API payload format
  convertLoginModelToApiPayload(loginModel: LoginModel): any {
    return {
      name: "myLogin",
      payload: loginModel,
    };
  }

  // Convert an API response to a LoginModel object
  convertApiResponseToLoginModel(apiResponse: any): LoginModel {
    if (apiResponse) {
      // Handle date conversion if present in the response
      return {
        ...apiResponse.payload,
        calendar: apiResponse?.payload?.calendar ? new Date(apiResponse.payload?.calendar) : null,
      };
    }
    // If no response, return a default empty LoginModel
    return defaultLoginModel();
  }

  // Convert an API response to a LoginConfig object
  convertApiResponseToLoginConfig(apiResponse: any): LoginConfig | null {
    if (apiResponse) {
      // Handle date conversion if present in the response
      return {
        ENABLE_MICROSOFT_LOGIN: true,
        ENABLE_GOOGLE_LOGIN: true,
        ENABLE_FORM_LOGIN: true,
        ENABLE_SIGNUP: true,
        SSO_PROVIDER: [
          {
            NAME: "Microsoft",
            CLIENT_ID: "ebd53e9a-adc4-4ef0-93ad-a7f9fcd54d93",
            TENANT_ID: "2f6740bd-afa3-4ca6-a2f0-deae89ed27ee",
          },
          {
            NAME: "Google",
            CLIENT_ID: "1006635141096-e71mr2ahbbo69lkp4t207sdg3rue1tvi.apps.googleusercontent.com",
            API_KEY: "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",
            CSE_ID: "1006635141096-e71mr2ahbbo69lkp4t207sdg3rue1tvi.apps.googleusercontent.com",
          },
        ],
      };
    }
    // If no response, return a default empty LoginModel
    return null;
  }

  // Dispatch common actions to update state
  dispatchScreenRenderStatusAction(
    dispatch: any,
    screenRenderStatus: ScreenRenderStatus = ScreenRenderStatus.LOADING
  ) {
    // Set loading, error, and success status in the application state
    dispatch({
      type: ActionType.SET_SCREEN_RENDER_STATUS,
      payload: screenRenderStatus,
    });
  }

  dispatchErrorMessageAction(dispatch: any, errorMessage = "") {
    // Set error message in the application state
    dispatch({
      type: ActionType.SET_ERROR_MESSAGE,
      payload: errorMessage,
    });
  }
  hostPattern = new RegExp(
    "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^localhost(:[0-9]+)?$|^0.0.0.0(:[0-9]+)?$"
  );
  // Handle API errors by dispatching appropriate actions
  async handleApiError(dispatch: any, error: any) {
    // Handle errors during API call or data retrieval
    this.dispatchScreenRenderStatusAction(dispatch, ScreenRenderStatus.ERROR);
    this.dispatchErrorMessageAction(dispatch, parseStandardAPIErrorMessage(error));
  }
  // Fetch form data by making a GET request to the API
  // @ts-ignore:will fix later
  async getTenantConfigData(): Promise<LoginConfig | null> {
    // Get the subdomain from the window.location.host

    return new Promise((resolve, reject) => {
      const host = window.location.host;
      let subdomain;
      if (!this.hostPattern.test(host)) {
        subdomain = host?.split(".")[0];
      } else {
        // local testing only
        // return null;
        resolve(this.convertApiResponseToLoginConfig({}));
      }
      const endPoint = `${DEFAULT_PATH}/tenant/${subdomain}`;
      resolve(this.convertApiResponseToLoginConfig({}));
      // try {
      //   // Make a GET request with authentication
      //   const response = await this.makeGetRequestWithAuth(endPoint);
      //   if (validateGetAPIResponse(response)) {
      //     // If the response is valid, format it and update the application state
      //     return this.convertApiResponseToLoginConfig(response.data);
      //   }
      // } catch (error: any) {
      //   // Handle API error and update the error state
      //   // Todo: Write the code to handle error later
      //   console.log(error);
      // }
      // return null;
    });
  }
}

export default new LoginAPIService();
