import { EventType, PublicClientApplication } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { linkAuthRoute, linkPageView1 } from "routes";
import { setLocalStorage } from "util/CommonUtil";
import { LOCAL_STORAGE } from "util/Constant";
import { loginRequest, msalConfig } from "./MicrosoftAuthConfig";
import LoginConfig from "model/LoginConfig";

export const initializeMsal = (loginConfig: LoginConfig) => {
  //first method
  msalConfig.auth.clientId = loginConfig.SSO_PROVIDER[0].CLIENT_ID;
  msalConfig.auth.authority = `https://login.microsoftonline.com/${loginConfig.SSO_PROVIDER[0].TENANT_ID}`;

  const msalInstance = new PublicClientApplication(msalConfig);

  if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const account = event.payload;
      // const account = event.payload.account;
      // msalInstance.setActiveAccount(account);
    }
  });

  return msalInstance;
};

export const useMicrosoftLogin = () => {
  const navigate = useNavigate();
  const { instance } = useMsal();

  const handleMicrosoftLogin = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);
      // Here, you can access the access token and other user information
      setLocalStorage(
        LOCAL_STORAGE.USER_INFO,
        JSON.stringify({
          accessToken: response.accessToken,
          tokenExpiry: response.expiresOn,
          refreshToken: response.requestId,
          refreshTokenExpiry: response.extExpiresOn,
          username: response.account?.username,
          userType: "ADMIN",
        })
      );
      navigate(`${linkAuthRoute}${linkPageView1}`);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleMicrosoftLogin };
};
