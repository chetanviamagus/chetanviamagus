export interface IRouteObj {
  path: string;
  exact?: boolean;
  name?: string;
  component: any;
  props?: Record<string, unknown>;
}
export interface CountryInfo {
  id?: number;
  flag: string;
  code: string;
  display?: string;
  countryName: string;
}

export interface RouteAccessControl {
  path: string;
  routeCode?: string;
  create: boolean;
  update: boolean;
  read: boolean;
  delete: boolean;
  softDelete: boolean;
  approve: boolean;
}

export interface IRouteGuard {
  on?: boolean;
  off?: boolean;
  isFormDirty?: boolean;
  formAccessLevel?: any;
  path?: string;
  create?: boolean;
  update?: boolean;
  read?: boolean;
  delete?: boolean;
  softDelete?: boolean;
  approve?: boolean;
}

import { BaseModel } from "../model/BaseModel";
import { ActionType, OperationType, ScreenRenderStatus } from "../util/CommonConstant";

// Define the initial state
export interface BaseFormState {
  screenRenderStatus: ScreenRenderStatus;
  errorMessage: string;
  operationType: OperationType;
  uid: string;
}

export interface BaseState {
  screenRenderStatus: ScreenRenderStatus;
  errorMessage: string;
}

export function loggingIdentity<T extends BaseModel>(arg: T): T {
  return arg;
}

// Define action creators
export interface SetScreenRenderStatusAction {
  type: ActionType.SET_SCREEN_RENDER_STATUS;
  payload: ScreenRenderStatus;
}

export interface SetOperationTypeAction {
  type: ActionType.SET_OPERATION_TYPE;
  payload: OperationType;
}

export interface SetErrorMessageAction {
  type: ActionType.SET_ERROR_MESSAGE;
  payload: string;
}

export interface SetInputChangeAction {
  type: ActionType.SET_INPUT_CHANGE;
  payload: { name: string; value: any }; // Use specific types for name and value
}
export interface SetDataAction<T extends BaseModel> {
  type: ActionType.SET_DATA;
  payload: T; // Replace 'FormModel' with your specific data type
}

export interface SetDataActionWithoutBase<T> {
  type: ActionType.SET_DATA;
  payload: T; // Replace 'FormModel' with your specific data type
}

export interface FormState<T extends BaseModel> extends BaseFormState {
  data: T;
}

export interface PageState<T> extends BaseState {
  data: T;
}

export interface FormPageState<T> extends BaseFormState {
  data: T;
}

export interface DropdownOption {
  label: string;
  value: string;
}

export interface IPrimeReactMenuObj {
  label?: string;
  items?: IPrimeReactMenuObj[];
  command?: (e: any) => void;
  icon?: string;
  url?: string;
  expanded?: boolean;
  disabled?: boolean;
  target?: string;
  separator?: boolean;
  style?: object;
  className?: string;
  template?: any;
}
