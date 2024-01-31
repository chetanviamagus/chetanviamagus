import BaseController from "./BaseController";
import { ActionType, ScreenRenderStatus } from "util/CommonConstant";
import { PageState } from "interface/common";
import { LoginModel } from "model/LoginModel";
import AuthService from "service/AuthService";
import LoginAPIService from "service/LoginAPIService";
import { getEnvVariableValue } from "util/CommonUtil";
import LoginConfig from "model/LoginConfig";

class LoginController extends BaseController {
  private loginState: PageState<LoginModel>;

  constructor(loginState: PageState<LoginModel>, dispatch: any) {
    super(dispatch); // Call the constructor of the parent class if needed.
    this.loginState = loginState;
  }

  init = async () => {
    await this.getTenantConfig();
    this.dispatch({
      type: ActionType.SET_SCREEN_RENDER_STATUS,
      payload: ScreenRenderStatus.SUCCESS,
    });
  };

  getTenantConfig = async () => {
    const isTenantBasedLoginConfig = getEnvVariableValue("VITE_LOAD_TENANT_BASED_LOGIN_CONFIG");
    if (isTenantBasedLoginConfig) {
      const loginConfig: LoginConfig = (await LoginAPIService.getTenantConfigData()) as LoginConfig;

      this.dispatch({
        type: ActionType.SET_DATA,
        payload: new LoginModel("", "", loginConfig),
      });
    }
  };
  submitForm = async () => {
    return await AuthService.login(this.loginState.data);
  };
}

export default LoginController;
