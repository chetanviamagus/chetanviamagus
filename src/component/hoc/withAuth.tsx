import { ACL_DIRTY_STATUS } from "component/utils/Constant";
import React, { useContext, useEffect, useState } from "react";
import { AclContext, IAclContext } from "../AclGuard";
import {
  isAclApplicable,
  isRouteGuardApplicable,
  saveAclGuardStatusToStorage,
} from "component/utils/Helper";

export const withAuth = (Component: React.FC<any>) => {
  const InputComponentWrapper = (props: any) => {
    const context: IAclContext = useContext(AclContext);
    const [isDisabled, setIsDisabled] = useState(props.disabled ?? false);

    useEffect(() => {
      if (isAclApplicable()) {
        if (!props.isignoreaccesslevel && context.isOn) {
          setIsDisabled(context.read);
        }
      }
    }, []);

    useEffect(() => {
      if (isAclApplicable()) {
        if (!props.isignoreaccesslevel && context.isOn) {
          setIsDisabled(context.read);
        } else {
          setIsDisabled(false);
        }
      }
    }, [context]);

    const onChange = (e: any) => {
      reportFormDirty();
      props.onChange(e);
    };

    const reportFormDirty = () => {
      if (isRouteGuardApplicable() && context.isOn) {
        saveAclGuardStatusToStorage(context.name, ACL_DIRTY_STATUS.Y);
      }
    };

    return (
      <Component
        {...props}
        onChange={onChange}
        isignoreaccesslevel={props.isignoreaccesslevel ?? false}
        isdisabledbyacl={isDisabled.toString()}
        reportFormDirty={reportFormDirty}
      />
    );
  };

  return InputComponentWrapper;
};
