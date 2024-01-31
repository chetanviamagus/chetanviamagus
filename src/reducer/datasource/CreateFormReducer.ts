import { PageState, SetDataActionWithoutBase } from "interface/common";
import {
  DatasourceCreateFormModel,
  defaultCreateFormModel,
} from "model/datasource/CreateFormModel";
import baseReducer, { BaseAction } from "reducer/BaseReducer";
import { ScreenRenderStatus } from "util/CommonConstant";

export type CreateFormAction = SetDataActionWithoutBase<DatasourceCreateFormModel>;

export const INITIAL_DATASOURCE_CREATE_STATE: PageState<DatasourceCreateFormModel> = {
  screenRenderStatus: ScreenRenderStatus.INIT,
  errorMessage: "",
  data: defaultCreateFormModel(),
};

const createFormReducer = (
  state: PageState<DatasourceCreateFormModel> = INITIAL_DATASOURCE_CREATE_STATE,
  action: BaseAction | CreateFormAction
): PageState<DatasourceCreateFormModel> => {
  const baseState = baseReducer(state, action as BaseAction);

  switch (action.type) {
    default:
      return baseState;
  }
};

export default createFormReducer;
