import { useState } from "react";
import { Navigate } from "react-router-dom";
import { linkPageLogin } from "routes";
import ACLService from "service/ACLService";
import HelperService from "service/HelperService";
import { encode, parseStandardAPIErrorMessage } from "util/CommonUtil";
import Page403 from "view/Page403";

interface IProps {
  AuthorizedComponent: any;
  urlPath: string;
  props?: Record<string, unknown>;
}

function AuthValidator(props: IProps) {
  const [errorMessageAcl, setErrorMessageAcl] = useState("");

  const isValid = () => {
    return !!HelperService.getUserInfo();
  };

  const getAccessOfPath = async () => {
    try {
      const res = await ACLService.getRouteAccessModel(props.urlPath ?? "");
      ACLService.saveRouteAccessControl(res);
    } catch (error) {
      setErrorMessageAcl(parseStandardAPIErrorMessage(error));
    }
  };

  if (isValid()) {
    if (ACLService.isAclApplicable()) {
      if (ACLService.isRouteHasAccess(props.urlPath ?? "")) {
        getAccessOfPath();
        if (!errorMessageAcl) {
          return <props.AuthorizedComponent {...props.props} />;
        } else {
          return <>{errorMessageAcl}</>;
        }
      } else {
        return <Page403 {...props.props} />;
      }
    } else {
      return <props.AuthorizedComponent {...props.props} />;
    }
  } else {
    return <Navigate to={`${linkPageLogin}?rto=` + encode(props.urlPath ?? "")} />;
  }
}

export default AuthValidator;
