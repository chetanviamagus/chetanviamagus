import { getEnvVariableValue } from "util/CommonUtil";
import LoginConfig from "./LoginConfig";

export class LoginModel {
  username = "";
  password = "";
  loginConfig: LoginConfig | null;
  // Add more fields as needed

  constructor(username = "", password = "", loginConfig: LoginConfig | null = null) {
    this.username = username;
    this.password = password;
    this.loginConfig = loginConfig;
  }
}

export const defaultLoginModel = () => {
  const defaultLoginConfig = JSON.parse(getEnvVariableValue("VITE_LOGIN_CONFIG") ?? "null");
  const loginModel = new LoginModel("", "", defaultLoginConfig);
  return loginModel;
};
