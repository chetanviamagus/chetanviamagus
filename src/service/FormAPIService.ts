import {
  parseStandardAPIErrorMessage,
  validateGetAPIResponse,
  validatePostAPIResponse,
  validatePutAPIResponse,
} from "../util/CommonUtil";
import BaseApiService from "./BaseApiService";
import { ActionType, ScreenRenderStatus } from "../util/CommonConstant";
import { FormState } from "../interface/common";
import { FormModel, defaultFormModel } from "../model/FormModel";

const DEFAULT_PATH = "/custom/api/generic/entity";

class FormAPIService extends BaseApiService {
  // Convert a FormModel object to the API payload format
  convertFormModelToApiPayload(formModel: FormModel): any {
    return {
      name: "myForm",
      payload: formModel,
    };
  }

  // Convert an API response to a FormModel object
  convertApiResponseToFormModel(apiResponse: any): FormModel {
    if (apiResponse) {
      // Handle date conversion if present in the response
      return {
        ...apiResponse.payload,
        calendar: apiResponse?.payload?.calendar ? new Date(apiResponse.payload?.calendar) : null,
      };
    }
    // If no response, return a default empty FormModel
    return defaultFormModel();
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

  // Handle API errors by dispatching appropriate actions
  async handleApiError(dispatch: any, error: any) {
    // Handle errors during API call or data retrieval
    this.dispatchScreenRenderStatusAction(dispatch, ScreenRenderStatus.ERROR);
    this.dispatchErrorMessageAction(dispatch, parseStandardAPIErrorMessage(error));
  }

  // Fetch form data by making a GET request to the API
  async getFormData(uid: string, dispatch: any) {
    // Set loading state while fetching data
    this.dispatchScreenRenderStatusAction(dispatch, ScreenRenderStatus.LOADING);
    const endPoint = `${DEFAULT_PATH}/uid/${uid}`;
    try {
      // Make a GET request with authentication
      const response = await this.makeGetRequestWithAuth(endPoint);
      if (validateGetAPIResponse(response)) {
        // If the response is valid, format it and update the application state
        const formattedResponse = this.convertApiResponseToFormModel(response.data);
        dispatch({
          type: ActionType.SET_DATA,
          payload: formattedResponse,
        });
        this.dispatchScreenRenderStatusAction(dispatch, ScreenRenderStatus.SUCCESS);
      }
    } catch (error: any) {
      // Handle API error and update the error state
      this.handleApiError(dispatch, error);
    }
  }

  // Post form data to the API
  async postForm(formState: FormState<FormModel>, dispatch: any) {
    // set screen render status to loading before making the request
    const endPoint = DEFAULT_PATH;
    const payload = this.convertFormModelToApiPayload(formState.data);
    try {
      // Make either a PUT or POST request with authentication
      const response = await this.makePostRequestWithAuth(endPoint, payload);
      // Validate the response based on the request type
      if (validatePostAPIResponse(response)) {
        // If the response is valid, return it
        return response;
        //Add toast message
      }
    } catch (error: any) {
      // Handle API error and update the error state
      this.handleApiError(dispatch, error);
    }
  }
  // Put form data to the API
  async putForm(formState: FormState<FormModel>, dispatch: any) {
    // set screen render status before making the request
    const endPoint = DEFAULT_PATH;
    const payload = this.convertFormModelToApiPayload(formState.data);
    try {
      // Make either a PUT or POST request with authentication
      const response = await this.makePutRequestWithAuth(`${endPoint}/${formState.uid}`, payload);
      // Validate the response based on the request type
      if (validatePutAPIResponse(response)) {
        // If the response is valid, return it
        return response;
        //Add toast message
      }
    } catch (error: any) {
      // Handle API error and update the error state
      this.handleApiError(dispatch, error);
    }
  }
}

export default new FormAPIService();
