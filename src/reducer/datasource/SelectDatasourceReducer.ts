import { FormPageState, SetDataActionWithoutBase } from "interface/common";
import {
  DatasourceSelectModel,
  defaultDatasourceSelectModel,
} from "model/datasource/SelectDatasourceModel";
import baseReducer, { BaseAction } from "reducer/BaseReducer";
import { OperationType, ScreenRenderStatus } from "util/CommonConstant";

export type SelectDatasourceAction = SetDataActionWithoutBase<DatasourceSelectModel>;

export const INITIAL_DATASOURCE_SELECT_STATE: FormPageState<DatasourceSelectModel> = {
  screenRenderStatus: ScreenRenderStatus.INIT,
  errorMessage: "",
  operationType: OperationType.CREATE,
  uid: "",
  data: defaultDatasourceSelectModel(),
};

const selectDatasourceReducer = (
  state: FormPageState<DatasourceSelectModel> = INITIAL_DATASOURCE_SELECT_STATE,
  action: BaseAction | SelectDatasourceAction
): FormPageState<DatasourceSelectModel> => {
  const baseState = baseReducer(state, action as BaseAction);

  switch (action.type) {
    default:
      return baseState;
  }
};

export default selectDatasourceReducer;
