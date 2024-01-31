import BaseApiService from "service/BaseApiService";
import { ActionType, ScreenRenderStatus } from "util/CommonConstant";
import { parseStandardAPIErrorMessage } from "util/CommonUtil";

const DEFAULT_PATH = "/custom/api/generic/entity";

class CreateFormAPIService extends BaseApiService {
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

  dispatchConnectionSuccess(
    dispatch: any,
    screenRenderStatus: ScreenRenderStatus = ScreenRenderStatus.SUCCESS
  ) {
    dispatch({
      type: ActionType.SET_SCREEN_RENDER_STATUS,
      payload: screenRenderStatus,
    });
  }

  // Handle API errors by dispatching appropriate actions
  async handleApiError(dispatch: any, error: any) {
    // Handle errors during API call or data retrieval
    this.dispatchScreenRenderStatusAction(dispatch, ScreenRenderStatus.ERROR);
    this.dispatchErrorMessageAction(dispatch, parseStandardAPIErrorMessage(error));
  }
}

export default new CreateFormAPIService();
