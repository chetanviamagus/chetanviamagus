// Define operation types
export enum ScreenRenderStatus {
  SUCCESS = "SUCCESS",
  LOADING = "LOADING",
  ERROR = "ERROR",
  INIT = "INIT",
}
// Define operation types
export enum OperationType {
  CREATE = "CREATE",
  EDIT = "EDIT",
  VIEW = "VIEW",
}

// Define action types
export enum ActionType {
  SET_SCREEN_RENDER_STATUS = "SET_SCREEN_RENDER_STATUS",
  SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE",
  SET_DATA = "SET_DATA",
  SET_OPERATION_TYPE = "SET_OPERATION_TYPE",
  SET_INPUT_CHANGE = "SET_INPUT_CHANGE",
}
