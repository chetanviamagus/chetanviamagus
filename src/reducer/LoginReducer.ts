// formReducer.ts

import { PageState, SetDataActionWithoutBase } from "interface/common";
import { LoginModel, defaultLoginModel } from "model/LoginModel";
import { ActionType, ScreenRenderStatus } from "../util/CommonConstant";
import baseReducer, { BaseAction } from "./BaseReducer";

export type LoginAction = SetDataActionWithoutBase<LoginModel>;

export const INITIAL_LOGIN_STATE: PageState<LoginModel> = {
  screenRenderStatus: ScreenRenderStatus.LOADING,
  errorMessage: "",
  data: defaultLoginModel(),
};

const loginReducer = (
  state: PageState<LoginModel> = INITIAL_LOGIN_STATE,
  action: BaseAction | LoginAction
): PageState<LoginModel> => {
  const baseState = baseReducer(state, action as BaseAction);

  switch (action.type) {
    case ActionType.SET_DATA:
      return {
        ...baseState,
        data: action.payload,
      };
    default:
      return baseState;
  }
};

export default loginReducer;
