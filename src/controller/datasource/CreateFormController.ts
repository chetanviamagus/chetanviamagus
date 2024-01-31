import BaseController from "controller/BaseController";
import { PageState } from "interface/common";
import { DatasourceCreateFormModel } from "model/datasource/CreateFormModel";

class CreateFormController extends BaseController {
  private createFormState: PageState<DatasourceCreateFormModel>;

  constructor(state: PageState<DatasourceCreateFormModel>, dispatch: any) {
    super(dispatch); // Call the constructor of the parent class if needed.
    this.createFormState = state;
  }

  init = async () => {};

  submitForm = async () => {
    // return await AuthService.login(this.createFormState.data);
  };
}

export default CreateFormController;
