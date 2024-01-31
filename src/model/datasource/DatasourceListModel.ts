import { IDatasourceListObj } from "interface/datasource";

export interface DatasourceListModel {
  list: IDatasourceListObj[];
}

export const defaultDatasourceListModel = () => {
  const DatasourceListModel: DatasourceListModel = {
    list: [],
  };
  return DatasourceListModel;
};
