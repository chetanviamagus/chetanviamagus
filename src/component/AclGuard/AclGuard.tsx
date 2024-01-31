import React, { useEffect, useState } from "react";
import { IRouteAccessModel } from "../interface/common";

import ShortUniqueId from "short-unique-id";
import {
  createNewRouteAccessModel,
  deleteAclGuardStatusFromStorage,
  getAccessLevel,
} from "component/utils/Helper";
export interface IAclContext extends IRouteAccessModel {
  isOn: boolean;
  name: string;
}
export const AclContext = React.createContext<IAclContext>({
  isOn: false,
  name: "",
  ...createNewRouteAccessModel(),
});

interface IAclGuardProps {
  status?: "ON" | "OFF"; // default value
  override?: IRouteAccessModel;
  children: React.ReactNode;
}

const AclGuard = React.forwardRef((props: IAclGuardProps, ref: any) => {
  const { children, override, status } = props;
  const uid = new ShortUniqueId({ length: 5 });

  const [aclContext, setAclContext] = useState({
    isOn: false,
    name: "",
    ...createNewRouteAccessModel(),
  });
  const routeAccessModelObj = override ?? getAccessLevel();

  /**
   * executed once when component is mounted
   */
  useEffect(() => {
    setContext();
    // Un mounting the component
    return () => {
      // deleteAclGuardStatusFromStorage(aclContext.name);
    };
  }, []);

  /**
   * executed once when status & override value changes
   */
  useEffect(() => {
    setContext();
  }, [status, override]);

  /**
   * executed once when the state of the context changes
   */
  useEffect(() => {
    if (!aclContext.isOn) {
      deleteAclGuardStatusFromStorage(aclContext.name);
    }
  }, [aclContext]);

  //  set the context variable based on state based on the status
  const setContext = () => {
    const newAclContext = {
      ...routeAccessModelObj,
      name: aclContext.name ? aclContext.name : uid(),
      isOn: status !== "OFF",
    };
    setAclContext(newAclContext);
  };

  React.useImperativeHandle(ref, () => ({
    props,
    getStatus: () => aclContext,
  }));

  return <AclContext.Provider value={aclContext}>{children}</AclContext.Provider>;
});

export default AclGuard;
