export interface DatasourceCreateFormModel {
  accessKey: string;
  secretAccessKey: string;
  // Add more fields as needed
}

export const defaultCreateFormModel = () => {
  const DatasourceCreateFormModel: DatasourceCreateFormModel = {
    accessKey: "",
    secretAccessKey: "",
  };
  return DatasourceCreateFormModel;
};
