export interface ISignUpService {
  emailId: string;
  password: string;
}

export interface ILoginService {
  username: string;
  password: string;
}

export interface IResetPassword {
  resetToken: string;
  password: string;
}

export interface IResetPasswordByOTP {
  channel: string;
  actionType: string;
  emailId: string;
}

export interface IVerifyOTP {
  channel: string;
  actionType: string;
  emailId: string;
  otp: string;
}

export interface IBody {
  username: string;
  password: string;
}
