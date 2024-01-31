import { BaseModel } from "./BaseModel";

export interface FormModel extends BaseModel {
  input: string;
  email: string;
  chips: string[];
  number: number | undefined;
  password: string;
  phone: string;
  textarea: string;
  dropdownStaticData: any;
  dropdownAPIData: any;
  dropdownAPIOptions: any[];
  multiselect: string[];
  autocomplete: string;
  calendar: Date | undefined;
  checkbox: boolean | undefined;
  radio: string | undefined;
  // Add more fields as needed
}
export const defaultFormModel = () => {
  const FormModel: FormModel = {
    input: "",
    email: "",
    chips: [],
    number: undefined,
    password: "",
    phone: "",
    textarea: "",
    dropdownStaticData: "",
    dropdownAPIData: "",
    dropdownAPIOptions: [],
    multiselect: [],
    autocomplete: "",
    calendar: undefined,
    checkbox: false,
    radio: "",
    id: 0,
    uid: "",
    requestId: "",
    createdAt: "",
    updatedAt: "",
    createdBy: 0,
    updatedBy: 0,
    isActive: true,
  };
  return FormModel;
};
