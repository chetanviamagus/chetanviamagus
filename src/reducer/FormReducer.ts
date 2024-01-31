// formReducer.ts

import baseReducer, { BaseAction } from "./BaseReducer";
import { ActionType, OperationType, ScreenRenderStatus } from "../util/CommonConstant";
import { FormState, SetDataAction } from "../interface/common";
import { FormModel, defaultFormModel } from "../model/FormModel";

export type FormAction = SetDataAction<FormModel>;

export const INITIAL_FORM_STATE: FormState<FormModel> = {
  screenRenderStatus: ScreenRenderStatus.LOADING,
  errorMessage: "",
  uid: "",
  operationType: OperationType.CREATE,
  data: defaultFormModel(),
};

const formReducer = (
  state: FormState<FormModel> = INITIAL_FORM_STATE,
  action: BaseAction | FormAction
): FormState<FormModel> => {
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

export default formReducer;
