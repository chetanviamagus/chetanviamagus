/* eslint-disable */
import { MsalProvider } from "@azure/msal-react";
import { initializeMsal } from "./microsoftService/MicrosoftUtil";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "asset/custom.css";
import { ACL_SESSION_STORAGE, IS_ACL_ENABLED, IS_ROUTE_ENABLED } from "component/utils/Constant";
import { getEnvVariableValue } from "util/CommonUtil";
import { ENV_VAR } from "util/Constant";
import "./i18n";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginConfig from "model/LoginConfig";
import LoginAPIService from "service/LoginAPIService";

// const log = console.log.bind(console, "%c >>KAIJU CONSOLE", "color:red;font-weight:bolder");
const isTenantBasedLoginConfig = getEnvVariableValue("VITE_LOAD_TENANT_BASED_LOGIN_CONFIG");
let loginConfig: LoginConfig = JSON.parse(getEnvVariableValue("VITE_LOGIN_CONFIG") ?? "null");
(async () => {
  if (isTenantBasedLoginConfig) {
    loginConfig = (await LoginAPIService.getTenantConfigData()) as LoginConfig;
  }

  let msalInstance: any = null;
  if (loginConfig.ENABLE_MICROSOFT_LOGIN) {
    // Initialize MSAL
    msalInstance = initializeMsal(loginConfig);
  }

  //Get google client ID
  let googleAuthClientID: string = "";
  if (loginConfig.ENABLE_GOOGLE_LOGIN) {
    googleAuthClientID = loginConfig.SSO_PROVIDER[1].CLIENT_ID;
  }

  // to hide console in prod
  if (getEnvVariableValue(ENV_VAR.VITE_SHOW_LOGS) === "false") console.log = () => {};

  // configure withAuth Hoc
  if (getEnvVariableValue(ENV_VAR.VITE_IS_ACL_ENABLED) === IS_ACL_ENABLED.Y) {
    sessionStorage.setItem(ACL_SESSION_STORAGE.IS_ACL_ENABLED, IS_ACL_ENABLED.Y);
  }

  if (getEnvVariableValue(ENV_VAR.VITE_IS_ROUTE_GUARD) === IS_ROUTE_ENABLED.Y) {
    sessionStorage.setItem(ACL_SESSION_STORAGE.IS_ROUTE_GUARD, IS_ROUTE_ENABLED.Y);
  }
  const container = document.getElementById("root");
  const root = createRoot(container!);

  switch (true) {
    case loginConfig.ENABLE_MICROSOFT_LOGIN && !loginConfig.ENABLE_GOOGLE_LOGIN:
      root.render(
        <>
          <div id="errorDiv12399" className="" />
          <div id="notificationBanner8328" className="sticky z-50" style={{ top: "0px" }} />
          <MsalProvider instance={msalInstance}>
            <App />
          </MsalProvider>
          <div
            id="notificationBannerBottom98328"
            className="sticky z-40"
            style={{ bottom: "0px" }}
          />
        </>
      );
      break;
    case loginConfig.ENABLE_GOOGLE_LOGIN && !loginConfig.ENABLE_MICROSOFT_LOGIN:
      root.render(
        <>
          <div id="errorDiv12399" className="" />
          <div id="notificationBanner8328" className="sticky z-50" style={{ top: "0px" }} />
          <GoogleOAuthProvider clientId={googleAuthClientID}>
            <App />
          </GoogleOAuthProvider>
          <div
            id="notificationBannerBottom98328"
            className="sticky z-40"
            style={{ bottom: "0px" }}
          />
        </>
      );
      break;
    case loginConfig.ENABLE_GOOGLE_LOGIN && loginConfig.ENABLE_MICROSOFT_LOGIN:
      root.render(
        <>
          <div id="errorDiv12399" className="" />
          <div id="notificationBanner8328" className="sticky z-50" style={{ top: "0px" }} />
          <MsalProvider instance={msalInstance}>
            <GoogleOAuthProvider clientId={googleAuthClientID}>
              <App />
            </GoogleOAuthProvider>
          </MsalProvider>
          <div
            id="notificationBannerBottom98328"
            className="sticky z-40"
            style={{ bottom: "0px" }}
          />
        </>
      );
      break;
    default:
      root.render(
        <>
          <div id="errorDiv12399" className="" />
          <div id="notificationBanner8328" className="sticky z-50" style={{ top: "0px" }} />
          <App />
          <div
            id="notificationBannerBottom98328"
            className="sticky z-40"
            style={{ bottom: "0px" }}
          />
        </>
      );
      break;
  }

  if (getEnvVariableValue("VITE_ENABLE_PWA_MODE")) {
    // to enable PWA mode uncomment the following
    serviceWorker.register({
      onSuccess: () => {
        console.log("SW >>> SUCCESSFULLY REGISTERED!!!");
      },
      onUpdate: (reg: any) => {
        console.log("SW >>> NEW UPDATE IS AVAILABLE!!!");
      },
    });
  } else {
    // standard mode service workers are off i.e not PWA mode
    serviceWorker.unregister();
  }
})();
