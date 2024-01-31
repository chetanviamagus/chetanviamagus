import BaseController from "../../controller/BaseController";
import { ActionType, OperationType, ScreenRenderStatus } from "../../util/CommonConstant";
import { FormState } from "../../interface/common";
import BranchAPIService from "./CreateAPIService";
import { BranchModel } from "./BranchModel";

class BranchController extends BaseController {
  private branchState: FormState<BranchModel>;

  constructor(branchState: FormState<BranchModel>, dispatch: any) {
    super(dispatch); // Call the constructor of the parent class if needed.
    this.branchState = branchState;
  }

  init = async () => {
    if (this.branchState.operationType === OperationType.CREATE) {
      this.dispatch({
        type: ActionType.SET_SCREEN_RENDER_STATUS,
        payload: ScreenRenderStatus.SUCCESS,
      });
    } else if (this.branchState.operationType === OperationType.VIEW) {
      return await BranchAPIService.getBranchData(this.branchState.uid, this.dispatch);
    }
  };

  submitBranch = async () => {
    if (this.branchState.operationType === OperationType.CREATE) {
      return await BranchAPIService.postBranch(this.branchState, this.dispatch);
    } else if (this.branchState.operationType === OperationType.EDIT) {
      return await BranchAPIService.putBranch(this.branchState, this.dispatch);
    }
  };
}

export default BranchController;
