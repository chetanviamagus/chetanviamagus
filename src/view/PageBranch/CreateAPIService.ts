import {
  parseStandardAPIErrorMessage,
  validateGetAPIResponse,
  validatePostAPIResponse,
  validatePutAPIResponse,
} from "util/CommonUtil";
import BaseApiService from "../../service/BaseApiService";
import { ActionType, ScreenRenderStatus } from "../../util/CommonConstant";
import { FormState } from "../../interface/common";
import { BranchModel, defaultBranchModel } from "./BranchModel";

const DEFAULT_PATH = "/custom/api/generic/entity";

class BranchAPIService extends BaseApiService {
  // Convert a BranchModel object to the API payload format
  convertBranchModelToApiPayload(branchModel: BranchModel): any {
    return {
      name: "myBranch",
      payload: branchModel,
    };
  }

  // Convert an API response to a BranchModel object
  convertApiResponseToBranchModel(apiResponse: any): BranchModel {
    if (apiResponse) {
      // Handle date conversion if present in the response
      return {
        ...apiResponse.payload,
        calendar: apiResponse?.payload?.calendar ? new Date(apiResponse.payload?.calendar) : null,
      };
    }
    // If no response, return a default empty BranchModel
    return defaultBranchModel();
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

  // Fetch branch data by making a GET request to the API
  async getBranchData(uid: string, dispatch: any) {
    // Set loading state while fetching data
    this.dispatchScreenRenderStatusAction(dispatch, ScreenRenderStatus.LOADING);
    const endPoint = `${DEFAULT_PATH}/uid/${uid}`;
    try {
      // Make a GET request with authentication
      const response = await this.makeGetRequestWithAuth(endPoint);
      if (validateGetAPIResponse(response)) {
        // If the response is valid, format it and update the application state
        const formattedResponse = this.convertApiResponseToBranchModel(response.data);
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

  // Post branch data to the API
  async postBranch(branchState: FormState<BranchModel>, dispatch: any) {
    // set screen render status to loading before making the request
    const endPoint = DEFAULT_PATH;
    const payload = this.convertBranchModelToApiPayload(branchState.data);
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
  // Put branch data to the API
  async putBranch(branchState: FormState<BranchModel>, dispatch: any) {
    // set screen render status before making the request
    const endPoint = DEFAULT_PATH;
    const payload = this.convertBranchModelToApiPayload(branchState.data);
    try {
      // Make either a PUT or POST request with authentication
      const response = await this.makePutRequestWithAuth(`${endPoint}/${branchState.uid}`, payload);
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

export default new BranchAPIService();
