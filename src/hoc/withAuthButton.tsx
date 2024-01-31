import React, { useContext, useEffect, useState } from "react";
import { AclContext, IAclContext } from "../component/AclGuard/AclGuard";
import { isAclApplicable } from "../component/utils/Helper";

export const withAuthButton = (Component: React.FC) => {
  const ButtonComponentWrapper = (props: any) => {
    const context: IAclContext = useContext(AclContext);
    const [isDisabled, setIsDisabled] = useState(props.disabled ?? false);

    useEffect(() => {
      if (isAclApplicable()) {
        if (!props.isIgnoreAccessLevel) {
          setIsDisabled(context.read);
        }
      }
    }, []);

    useEffect(() => {
      if (isAclApplicable()) {
        if (!props.isIgnoreAccessLevel) {
          setIsDisabled(context.read);
        } else {
          setIsDisabled(false);
        }
      }
    }, [context]);

    return <Component {...props} isDisabledByAcl={isDisabled} />;
  };

  return ButtonComponentWrapper;
};
