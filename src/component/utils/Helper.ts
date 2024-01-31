import { IRouteAccessModel } from "component/interface/common";
import { ACL_SESSION_STORAGE } from "./Constant";

export const isAclApplicable = (): boolean => {
  return sessionStorage.getItem(ACL_SESSION_STORAGE.IS_ACL_ENABLED) ? true : false;
};
export const isRouteGuardApplicable = (): boolean => {
  return sessionStorage.getItem(ACL_SESSION_STORAGE.IS_ROUTE_GUARD) ? true : false;
};

export const getAccessLevel = (): IRouteAccessModel => {
  const routeAccessModelObj = JSON.parse(
    sessionStorage.getItem(ACL_SESSION_STORAGE.ACL_GUARD) ?? ""
  );
  return routeAccessModelObj;
};

export const saveRouteAccessControlToStorage = (routeAccessControl: IRouteAccessModel) => {
  sessionStorage.setItem(ACL_SESSION_STORAGE.ACL_GUARD, JSON.stringify(routeAccessControl));
};

export const saveAclGuardStatusToStorage = (aclGuardName: string, status: string) => {
  sessionStorage.setItem(
    `${ACL_SESSION_STORAGE.ACL_GUARD_DIRTY_STATUS_PREFIX}_${aclGuardName}`,
    status
  );
};
export const deleteAclGuardStatusFromStorage = (aclGuardName: string) => {
  sessionStorage.removeItem(`${ACL_SESSION_STORAGE.ACL_GUARD_DIRTY_STATUS_PREFIX}_${aclGuardName}`);
};
export const getAllAclGuardStatus = () => {
  console.log("getAllAclGuardStatus");
};

export const createNewRouteAccessModel = (): IRouteAccessModel => {
  return {
    read: false,
    approve: false,
    update: false,
    create: false,
    delete: false,
    path: "",
    softDelete: false,
  };
};
