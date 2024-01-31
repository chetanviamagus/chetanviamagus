// baseReducer.ts

import { ActionType } from "../util/CommonConstant";
import {
  SetScreenRenderStatusAction,
  SetErrorMessageAction,
  SetInputChangeAction,
  SetOperationTypeAction,
} from "../interface/common";

export type BaseAction =
  | SetScreenRenderStatusAction
  | SetErrorMessageAction
  | SetInputChangeAction
  | SetOperationTypeAction;

const baseReducer = (state: any, action: BaseAction): any => {
  switch (action.type) {
    case ActionType.SET_SCREEN_RENDER_STATUS:
      return {
        ...state,
        screenRenderStatus: action.payload,
      };
    case ActionType.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case ActionType.SET_OPERATION_TYPE:
      return {
        ...state,
        operationType: action.payload,
      };
    case ActionType.SET_INPUT_CHANGE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.name]: action.payload.value,
        },
      };
    default:
      return state;
  }
};

export default baseReducer;
