import { FormPageState, SetDataActionWithoutBase } from "interface/common";
import {
  DatasourceListModel,
  defaultDatasourceListModel,
} from "model/datasource/DatasourceListModel";
import baseReducer, { BaseAction } from "reducer/BaseReducer";
import { ActionType, OperationType, ScreenRenderStatus } from "util/CommonConstant";

export type DatasourceListAction = SetDataActionWithoutBase<DatasourceListModel>;

export const INITIAL_DATASOURCE_LIST_STATE: FormPageState<DatasourceListModel> = {
  screenRenderStatus: ScreenRenderStatus.INIT,
  errorMessage: "",
  operationType: OperationType.CREATE,
  uid: "",
  data: defaultDatasourceListModel(),
};

const datasourceListReducer = (
  state: FormPageState<DatasourceListModel> = INITIAL_DATASOURCE_LIST_STATE,
  action: BaseAction | DatasourceListAction
): FormPageState<DatasourceListModel> => {
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

export default datasourceListReducer;
