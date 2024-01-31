import { useEffect } from "react";
import { NavigateOptions, useLocation, useNavigate } from "react-router-dom";
import { linkAuthRoute } from "routes";
import ACLService from "service/ACLService";
import { logWithColor } from "util/CommonUtil";

export interface RouteProps {
  navigate?: any;
  navigateNoAuth?: any;
  location?: any;
  goBack?: any;
}
export const withRouter = (Component: any, isIgnoreEventRegister?: boolean) => {
  const ViewWrapper = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();

    const onNavigateWithAuth = (path: string, options?: NavigateOptions) => {
      navigate(`${linkAuthRoute}/${path}`, options);
    };

    const onGoBack = () => {
      navigate(-1);
    };

    const onNavigate = (event: any) => {
      console.log("On Navigate");
      const isFormDirty = ACLService.isFormDirty();
      if (isFormDirty) {
        const res = window.confirm("Sure ?");
        if (res) {
          ACLService.clearFormDirty();
        } else {
          event.preventDefault();
        }
      }
    };

    useEffect(() => {
      const { name } = Component;
      logWithColor(`Mounted the component ${name}`, "green");

      if (!isIgnoreEventRegister) {
        window.navigation.addEventListener("navigate", onNavigate);
        logWithColor(`Event Registered for ${name}`, "yellow");
      }

      return () => {
        if (!isIgnoreEventRegister) {
          window.navigation.removeEventListener("navigate", onNavigate);
          logWithColor("Event Removed for " + name, "red");
        }
      };
    }, []);

    return (
      <Component
        navigate={onNavigateWithAuth}
        navigateNoAuth={navigate}
        goBack={onGoBack}
        location={location}
        {...props}
      />
    );
  };

  return ViewWrapper;
};
