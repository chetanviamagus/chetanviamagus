import welcome from "asset/img/welcome.svg";
import ButtonBox from "component/ButtonBox";
import InputBox from "component/InputBox";
import queryString from "query-string";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { linkPageView1 } from "routes";
import AuthService from "service/AuthService";
import SimpleReactValidator from "simple-react-validator";
import { decode, getEnvVariableValue, setLocalStorage } from "util/CommonUtil";

interface ILoginPageService {
  username: string;
  password: string;
}

const PageLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<{
    email: string;
    password: string;
    message?: string;
  }>({
    email: "",
    password: "",
  });

  const validator = new SimpleReactValidator({ autoForceUpdate: setState });

  useEffect(() => {
    if (getEnvVariableValue("VITE_APP_ENABLE_PWA_MODE")) {
      if (window.isIos() && !window.isInStandaloneModeIOS()) {
        // Render iOS installation notification
        renderInstallationNotification("iOS");
      } else if (window.isAndroid() && !window.isInStandaloneModeAndroid()) {
        // Render Android installation notification
        renderInstallationNotification("Android");
      }
    }
  }, []); // Empty dependency array means it runs once, similar to componentDidMount

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (e: React.ChangeEvent<HTMLInputElement>) => {
    validator.showMessageFor(e?.target?.name); // Pass the name of the field instead of the entire event object
  };

  const validateForm = () => {
    return validator.allValid();
  };

  const validateAllThenSubmit = async () => {
    if (validateForm()) {
      const parsed: queryString.ParsedQuery<string> = queryString.parse(location.search);
      const enrichObj = enrichForCreate();

      try {
        const res = await AuthService.login(enrichObj);

        if (res.status === 201) {
          setLocalStorage("userInfo", JSON.stringify(res.data));
          if (parsed.rto) {
            const decodedRto = Array.isArray(parsed.rto) ? parsed.rto[0] : parsed.rto;
            navigate(decode(decodedRto));
          } else {
            navigate(`console/${linkPageView1}`);
          }
        } else {
          setState((prev) => ({ ...prev, message: res.data.message }));
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      validator.showMessages();
      alert("The form still has errors!");
    }
  };

  const enrichForCreate = (): ILoginPageService => {
    return {
      username: state.email,
      password: state.password,
    };
  };

  const renderInstallationNotification = (device: string) => {
    const message =
      device === "iOS"
        ? "Install our webapp on your iOS device. Tap and then Add to Home screen."
        : "Install our webapp on your Android device. Tap and then Add to Home screen.";

    ReactDOM.render(
      <div className="flex h-16 w-full flex-col items-center justify-center bg-blue-200 px-4 text-xs text-gray-800">
        <div className="flex flex-row">
          <i className="pi pi-plus text-base" />
          <div className="pl-1 text-left">{message}</div>
        </div>
        <div className="flex flex-row">
          {device === "iOS" ? (
            <>
              Tap
              <img src={"#"} className="m-0 h-5 px-2" alt="ios" />
            </>
          ) : (
            <>
              Tap
              <i className="pi pi-ellipsis-v text-base" />
            </>
          )}
          and then Add to Home screen.
        </div>
      </div>,
      document.getElementById("notificationBanner8328")
    );
  };

  return (
    <div className="flex mx-auto w-full md:max-w-rightContent p-3 h-screen flex-col justify-center bg-white pt-4">
      <div className="w-sm self-center rounded-md pb-4 pt-4">
        <div className="flex flex-col">
          <img className="h-64" src={welcome} alt="logo" />
        </div>
      </div>
      <div className="w-sm self-center rounded-md pb-4 pt-4">
        <div className="p-2 text-center text-sm text-red-400">
          <InputBox
            placeholder="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
            onBlur={validate}
          />
        </div>
        <div className="p-2 text-center text-sm text-red-400">
          <InputBox
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
            onBlur={validate}
          />
        </div>
        <div className="p-2 text-center text-xs">
          <div className="pt-6 text-xl">
            <ButtonBox label="Login" onClick={validateAllThenSubmit} />
          </div>
          <div className="pt-6 text-gray-600">Hint: demo@viamagus.com / demo</div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
