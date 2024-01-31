import { DATASOURCE_KEYS } from "util/DataSourceConstant";

export type DatasourceAssetObj = Record<
  DATASOURCE_KEYS,
  {
    name?: string;
    key: DATASOURCE_KEYS;
    logo?: string;
    formStructure?: {
      name: string;
      key: string;
      type: "text" | "password" | "textarea" | "dropdown";
      validations?: string;
      placeholder?: string;
      value?: string;
    }[];
  }
>;

export interface DataSourceAsset {
  name?: string;
  key: DATASOURCE_KEYS;
  logo?: string;
  formStructure?: {
    name?: string;
    key: string;
    type: "text" | "password" | "textarea" | "dropdown";
    validations?: string;
    placeholder?: string;
    value?: string;
  }[];
}

export interface IDatasourceListObj extends DataSourceAsset {
  uid: string;
  accountNo: string;
  username: string;
  datasourceCount: number;
}
