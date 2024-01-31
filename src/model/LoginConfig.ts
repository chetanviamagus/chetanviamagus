export class SSOProvider {
  NAME: string;
  CLIENT_ID: string;
  TENANT_ID?: string;
  API_KEY?: string;
  CSE_ID?: string;

  constructor(
    NAME: string,
    CLIENT_ID: string,
    TENANT_ID?: string,
    API_KEY?: string,
    CSE_ID?: string
  ) {
    this.NAME = NAME;
    this.CLIENT_ID = CLIENT_ID;
    this.TENANT_ID = TENANT_ID;
    this.API_KEY = API_KEY;
    this.CSE_ID = CSE_ID;
  }
}

export default class LoginConfig {
  ENABLE_MICROSOFT_LOGIN: boolean;
  ENABLE_GOOGLE_LOGIN: boolean;
  ENABLE_FORM_LOGIN: boolean;
  ENABLE_SIGNUP: boolean;
  SSO_PROVIDER: SSOProvider[];

  constructor(
    ENABLE_MICROSOFT_LOGIN: boolean,
    ENABLE_GOOGLE_LOGIN: boolean,
    ENABLE_FORM_LOGIN: boolean,
    ENABLE_SIGNUP: boolean,
    SSO_PROVIDER: SSOProvider[]
  ) {
    this.ENABLE_MICROSOFT_LOGIN = ENABLE_MICROSOFT_LOGIN;
    this.ENABLE_GOOGLE_LOGIN = ENABLE_GOOGLE_LOGIN;
    this.ENABLE_FORM_LOGIN = ENABLE_FORM_LOGIN;
    this.ENABLE_SIGNUP = ENABLE_SIGNUP;
    this.SSO_PROVIDER = SSO_PROVIDER;
  }
}
