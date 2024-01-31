import { ActionType, OperationType } from "../util/CommonConstant";

class BaseController {
  dispatch: any;
  constructor(dispatch: any) {
    this.dispatch = dispatch;
  }

  //Generally used for input box, text area, radio button
  handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    this.dispatch({
      type: ActionType.SET_INPUT_CHANGE,
      payload: { name: name, value: value },
    });
  };

  //Generally used for dropdowns, date picker, autocomplete
  handleChange = (event: { value: any; target: { name: string } }) => {
    const { target, value } = event;
    this.dispatch({
      type: ActionType.SET_INPUT_CHANGE,
      payload: { name: target.name, value: value },
    });
  };

  //Generally used for checkbox
  handleCheckboxChange = (event: { value: any; target: { name: string; checked: boolean } }) => {
    this.dispatch({
      type: ActionType.SET_INPUT_CHANGE,
      payload: { name: event.target.name, value: event.target.checked },
    });
  };

  //Generally used for page change mode (create, edit and view)
  changePageMode = (operationType: OperationType) => {
    this.dispatch({ type: ActionType.SET_OPERATION_TYPE, payload: operationType });
  };

  resetForm = () => {
    console.log("Form");
  };

  cancelForm = () => {
    console.log("Form");
  };
}
export default BaseController;
