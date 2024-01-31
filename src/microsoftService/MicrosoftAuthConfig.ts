import { Configuration, LogLevel } from "@azure/msal-browser";
import { getEnvVariableValue } from "util/CommonUtil";

export const msalConfig: Configuration = {
  auth: {
    clientId: `${getEnvVariableValue("VITE_MICROSOFT_CLIENT_ID")}`, // Application (client) ID from MSAL
    authority: `https://login.microsoftonline.com/${getEnvVariableValue(
      "VITE_MICROSOFT_TENANT_ID"
    )}`, //Directory (tenant) ID from MSAL
    redirectUri: "/", // The redirect URI of your app
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "localStorage", // Can be 'localStorage' or 'sessionStorage'
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};
