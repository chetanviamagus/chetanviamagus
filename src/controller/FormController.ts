import BaseController from "./BaseController";
import { ActionType, OperationType, ScreenRenderStatus } from "../util/CommonConstant";
import { FormState } from "../interface/common";
import FormAPIService from "../service/FormAPIService";
import { FormModel } from "../model/FormModel";

class FormController extends BaseController {
  private formState: FormState<FormModel>;

  constructor(formState: FormState<FormModel>, dispatch: any) {
    super(dispatch); // Call the constructor of the parent class if needed.
    this.formState = formState;
  }

  init = async () => {
    if (this.formState.operationType === OperationType.CREATE) {
      this.dispatch({
        type: ActionType.SET_SCREEN_RENDER_STATUS,
        payload: ScreenRenderStatus.SUCCESS,
      });
    } else if (this.formState.operationType === OperationType.VIEW) {
      return await FormAPIService.getFormData(this.formState.uid, this.dispatch);
    }
  };

  submitForm = async () => {
    if (this.formState.operationType === OperationType.CREATE) {
      return await FormAPIService.postForm(this.formState, this.dispatch);
    } else if (this.formState.operationType === OperationType.EDIT) {
      return await FormAPIService.putForm(this.formState, this.dispatch);
    }
  };
}

export default FormController;
