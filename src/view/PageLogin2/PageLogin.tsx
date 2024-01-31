import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import googleLogo from "asset/img/logos/google-icon.svg";
import hawkeyeLogo from "asset/img/logos/logo.svg";
import microsoftLogo from "asset/img/logos/microsoft-icon.svg";
import { AnimateTyping } from "component/AnimateTyping/AnimateTyping";
import ButtonBox from "component/ButtonBox/ButtonBox";
import InputBox from "component/InputBox/InputBox";
import InputError from "component/InputError/InputError";
import LoginController from "controller/LoginController";
import queryString from "query-string";
import { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginReducer, { INITIAL_LOGIN_STATE } from "reducer/LoginReducer";
import { linkAuthRoute, linkHomeBase, linkPageView1 } from "routes";
import LoginAPIService from "service/LoginAPIService";
import SimpleReactValidator from "simple-react-validator";
import {
  getStandardValidator,
  messageReplace,
  parseStandardAPIErrorMessage,
  setLocalStorage,
} from "util/CommonUtil";
import { LOCAL_STORAGE } from "util/Constant";
import { useMicrosoftLogin } from "../../microsoftService/MicrosoftUtil";

const PageLogin = () => {
  const navigate = useNavigate();
  const { handleMicrosoftLogin } = useMicrosoftLogin();

  useEffect(() => {
    const container = document.getElementById("container");

    const handleMouseMove = (e: any) => {
      if (container) {
        const mouseX = e.clientX - container.getBoundingClientRect().left;
        const mouseY = e.clientY - container.getBoundingClientRect().top;

        const percentageX = (mouseX / container.clientWidth) * 100;
        const percentageY = (mouseY / container.clientHeight) * 100;

        container.style.background = `radial-gradient(
          circle at ${percentageX}% ${percentageY}%,
          #24344d 15.88%,
          #11161e 100%
        )`;
      }
    };

    container?.addEventListener?.("mousemove", handleMouseMove);

    return () => {
      container?.removeEventListener?.("mousemove", handleMouseMove);
    };
  }, []);

  const [loginState, dispatch] = useReducer(loginReducer, {
    ...INITIAL_LOGIN_STATE,
  });

  const [, forceUpdate] = useState<undefined | boolean>(undefined);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      validators: { ...getStandardValidator() },
      ...messageReplace(),
      autoForceUpdate: { forceUpdate: () => forceUpdate((prev) => !prev) },
    })
  );
  /* 
    -----------------------------------------------------------------------------------------------------------------------
    Validators:
    -----------------------------------------------------------------------------------------------------------------------
  */

  const validate = (e: any) => {
    simpleValidator?.current?.showMessageFor(e?.target?.name);
  };

  const validateForm = () => {
    let isValid = false;
    isValid = simpleValidator?.current?.allValid();
    if (isValid) {
      return true;
    } else {
      forceUpdate((prev) => !prev);
      simpleValidator?.current?.showMessages();
      forceUpdate((prev) => !prev);
      return false;
    }
  };

  // Create an instance of LoginController to manage form actions
  const controller = new LoginController(loginState, dispatch);

  useEffect(() => {
    controller.init();
  }, []);

  // Event handlers for form inputs
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    controller.handleInputChange(event);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();
    return new Promise((resolve, reject) => {
      if (!validateForm()) {
        reject("Not Valid");
        return;
      }

      const parsed: queryString.ParsedQuery<string> = queryString.parse(location.search);
      console.log("Form submitted with data:", loginState);

      try {
        // const res: AxiosResponse<any> = await controller.submitForm();

        // if (res.status === 201) {
        //   setLocalStorage(LOCAL_STORAGE.USER_INFO, JSON.stringify(res.data));
        //   if (parsed.rto) {
        //     const decodedRto = Array.isArray(parsed.rto) ? parsed.rto[0] : parsed.rto;
        //     navigate(decode(decodedRto));
        //   } else {
        //     navigate(`${linkAuthRoute}${linkPageView1}`);
        //   }
        // } else {
        //   LoginAPIService.handleApiError(dispatch, res.data?.message ?? "");
        // }

        //We should remove this after API is ready
        if (
          loginState.data.username === "demouser@neubird.ai" &&
          loginState.data.password == "strawberryicecream"
        ) {
          setLocalStorage(
            LOCAL_STORAGE.USER_INFO,
            JSON.stringify({
              accessToken: "xyz",
              tokenExpiry: 1702386823,
              refreshToken: "abc",
              refreshTokenExpiry: 1702471423,
              username: "demouser@neubird.ai",
              userType: "ADMIN",
            })
          );
          // if (parsed.rto) {
          //   const decodedRto = Array.isArray(parsed.rto) ? parsed.rto[0] : parsed.rto;
          //   navigate(linkAuthRoute + decode(decodedRto));
          // } else {
          //   navigate(`${linkAuthRoute}${linkHomeBase}`);
          // }
          navigate(`${linkAuthRoute}${linkHomeBase}`);
        } else {
          LoginAPIService.dispatchErrorMessageAction(dispatch, "Invalid username or password");
        }
      } catch (err: any) {
        LoginAPIService.dispatchErrorMessageAction(
          dispatch,
          parseStandardAPIErrorMessage(err) ?? err?.message ?? "Error"
        );
      } finally {
        resolve("Success");
      }
    });
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      // const decode  = jwtDecode(credentialResponse.scope);
      console.log(tokenResponse);
      setLocalStorage(
        LOCAL_STORAGE.USER_INFO,
        JSON.stringify({
          accessToken: "xyz",
          tokenExpiry: 1702386823,
          refreshToken: "abc",
          refreshTokenExpiry: 1702471423,
          username: "test@neubird.ai",
          userType: "ADMIN",
        })
      );
      navigate(`${linkAuthRoute}${linkPageView1}`);
    },
    onError: () => console.log("Login Failed"),
  });
  console.log(
    "loginState.data.loginConfig?.ENABLE_GOOGLE_LOGIN",
    loginState.data.loginConfig?.ENABLE_GOOGLE_LOGIN
  );
  console.log(
    "loginState.data.loginConfig?.ENABLE_MICROSOFT_LOGIN",
    loginState.data.loginConfig?.ENABLE_MICROSOFT_LOGIN
  );
  return (
    <div
      id="container"
      className="lg:min-w-screen flex h-full min-h-screen w-full  items-center justify-center bg-light-patch-radial-gradient text-primary-text-main dark:bg-dark-patch-radial-gradient dark:text-dark-text-main"
    >
      <div className="lg:w-266 m-auto">
        <div className="flex flex-col items-center gap-x-16 lg:flex-row">
          <div className="mt-9 w-11/12 sm:w-4/5 lg:mt-0 lg:w-auto">
            <div className="mb-9 animate-slideRight">
              <img src={hawkeyeLogo} alt="logo" className="h-17" />
            </div>
            <h1 className="mb-6 text-heading-1">
              Get started <br />
              with <AnimateTyping>Hawkeye!</AnimateTyping>
            </h1>
            <p className="text-body-copy-2 text-primary-text-v2 lg:w-129 dark:text-dark-text-v2">
              Welcome to Hawkeye by NeuBird. Get Real-Time Generative Analytics on your Business
              Data Sources. Click <a className="cursor-pointer hover:underline ">HERE</a> for a demo
              on how it works.
            </p>
          </div>
          <div
            // onSubmit={handleSubmit}
            className="w-11/12 rounded-xl bg-primary-login-card px-10 py-12 shadow-light-black-transparent-25 backdrop-blur-xs sm:w-3/5  lg:w-129 lg:px-16 dark:bg-dark-login-card dark:shadow-dark-black-transparent-25"
          >
            <h2 className="mb-9 text-heading-2">Login to your account</h2>
            <div className="mb-9 flex flex-col gap-3">
              {loginState.data.loginConfig?.ENABLE_MICROSOFT_LOGIN && (
                <ButtonBox
                  label="Login with Microsoft"
                  iconImg={microsoftLogo}
                  color="transparent-black"
                  onClick={handleMicrosoftLogin}
                />
              )}
              {/* <GoogleOAuthProvider clientId="1006635141096-e71mr2ahbbo69lkp4t207sdg3rue1tvi.apps.googleusercontent.com"> */}
              {loginState.data.loginConfig?.ENABLE_GOOGLE_LOGIN && (
                <ButtonBox
                  label="Login with Google"
                  iconImg={googleLogo}
                  color="transparent-black"
                  onClick={() => handleGoogleLogin()}
                />
              )}
            </div>
            <div className="mb-6 flex items-center gap-6">
              <hr className="flex-grow border-primary-horizontal-line  dark:border-dark-horizontal-line" />
              <div className="text-body-copy-2 text-primary-text-v2 dark:text-dark-text-v2">
                Or Login with
              </div>
              <hr className="flex-grow border-primary-horizontal-line  dark:border-dark-horizontal-line" />
            </div>
            <div className="mb-3 flex flex-col gap-y-3">
              <InputBox
                label="Email"
                placeholder="kenny.lava@kroger.com"
                name="username"
                onChange={handleInputChange}
                value={loginState.data.username}
                onBlur={validate}
                validation={simpleValidator?.current?.message(
                  "username",
                  loginState.data.username,
                  "mandatory|email"
                )}
              />
              <InputBox
                label="Password"
                placeholder="Enter password"
                name="password"
                type="password"
                rightCTA="Forgot Password?"
                onClickRightCTA={() => alert("Forgot Password?")}
                onChange={handleInputChange}
                value={loginState.data.password}
                onBlur={validate}
                validation={simpleValidator?.current?.message(
                  "password",
                  loginState.data.password,
                  "mandatory"
                )}
              />
            </div>
            <ButtonBox label="Login" color="gradient-blue" onClickWithLoader={handleSubmit} />
            <InputError
              validation={loginState.errorMessage}
              errorClassNames="mt-1 flex justify-center"
            />
            <div className="mt-12 text-center text-body-copy-2 text-primary-text-v2 dark:text-dark-text-v2">
              Do not have an account yet?{" "}
              <a className="ml-auto cursor-pointer text-body-copy-2 text-primary-link-btn-color hover:underline">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
