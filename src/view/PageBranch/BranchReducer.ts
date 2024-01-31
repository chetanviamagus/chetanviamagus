// branchReducer.ts

import baseReducer, { BaseAction } from "../../reducer/BaseReducer";
import { ActionType, OperationType, ScreenRenderStatus } from "../../util/CommonConstant";
import { FormState, SetDataAction } from "../../interface/common";
import { BranchModel, defaultBranchModel } from "./BranchModel";

export type BranchAction = SetDataAction<BranchModel>;

export const INITIAL_BRANCH_STATE: FormState<BranchModel> = {
  screenRenderStatus: ScreenRenderStatus.LOADING,
  errorMessage: "",
  uid: "",
  operationType: OperationType.CREATE,
  data: defaultBranchModel(),
};

const branchReducer = (
  state: FormState<BranchModel> = INITIAL_BRANCH_STATE,
  action: BaseAction | BranchAction
): FormState<BranchModel> => {
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

export default branchReducer;
