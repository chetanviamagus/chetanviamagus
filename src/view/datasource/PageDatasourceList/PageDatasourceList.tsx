import CardAdd from "component/CardAdd/CardAdd";
import CardView from "component/CardView/CardView";
import Text from "component/Text";
import { IDatasourceListObj } from "interface/datasource";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import datasourceListReducer, {
  INITIAL_DATASOURCE_LIST_STATE,
} from "reducer/datasource/DataSourceListReducer";
import { linkAuthRoute, linkDataSourceAddNew, linkDataSourceSelectView } from "routes";
import DatasourceListAPIService from "service/datasource/DatasourceListAPIService";
import { LOCAL_STORAGE } from "util/Constant";
import { DATASOURCE_ASSETS, DATASOURCE_KEYS } from "util/DataSourceConstant";

function PageDatasourceList() {
  const datasourceArray = localStorage.getItem(LOCAL_STORAGE.DATASOURCE_LIST)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.DATASOURCE_LIST) || "")
    : [];

  const datasourceList = datasourceArray.map((datasource: IDatasourceListObj) => {
    return {
      key: datasource.key,
      uid: datasource.uid,
      accountNo: datasource.accountNo,
      username: datasource.username,
      datasourceCount: datasource.datasourceCount,
      assets: DATASOURCE_ASSETS[datasource.key],
    };
  });

  const [datasourceListState, dispatch] = useReducer(datasourceListReducer, {
    ...INITIAL_DATASOURCE_LIST_STATE,
    data: {
      ...INITIAL_DATASOURCE_LIST_STATE.data,
      list: datasourceList,
    },
  });

  const setList = (newList: IDatasourceListObj[]) => {
    DatasourceListAPIService.dispatchSetDatasourceList(dispatch, newList);
  };

  const navigate = useNavigate();

  const gotoAddNew = () => {
    navigate(linkAuthRoute + linkDataSourceAddNew);
  };

  const gotoViewDataSource = (datasourceKey: string, uid: string) => {
    navigate(linkAuthRoute + linkDataSourceSelectView + `/${datasourceKey}/${uid}`);
  };

  return (
    <div className="mx-auto flex h-full w-full flex-col gap-3 p-3 md:max-w-rightContent">
      <div className="box-content flex min-h-9 flex-col gap-3 px-3 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <Text className="text-heading-2 font-bold" label={"Connected Accounts"} />
      </div>

      <div
        className="screen-bg w-full rounded-4.5 p-3"
        style={{ minHeight: "calc(100vh - 108px)" }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
          <CardAdd onClick={gotoAddNew} label="Add account" heightClass="h-66" />

          {datasourceListState?.data?.list?.map?.((datasource: IDatasourceListObj) => {
            return (
              <CardView
                key={datasource.uid}
                datasourceDetails={datasource}
                onView={() => gotoViewDataSource(datasource.key, datasource.uid)}
                setList={setList}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PageDatasourceList;
