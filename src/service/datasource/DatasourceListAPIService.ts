import { IDatasourceListObj } from "interface/datasource";
import BaseApiService from "service/BaseApiService";
import { ActionType } from "util/CommonConstant";

const DEFAULT_PATH = "/custom/api/generic/entity";

class DatasourceListAPIService extends BaseApiService {
  dispatchSetDatasourceList(dispatch: any, list: IDatasourceListObj[] = []) {
    dispatch({
      type: ActionType.SET_DATA,
      payload: { list },
    });
  }
}

export default new DatasourceListAPIService();
