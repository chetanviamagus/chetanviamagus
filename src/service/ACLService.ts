import { IRouteAccessModel } from "component/interface/common";
import {
  getAccessLevel,
  isAclApplicable,
  saveRouteAccessControlToStorage,
} from "component/utils/Helper";
import { ACL_SESSION_STORAGE } from "component/utils/Constant";

const DUMMY_ROUTE_ACL_OBJ: IRouteAccessModel = {
  path: "/console/view1",
  create: false,
  update: false,
  read: true,
  delete: false,
  softDelete: false,
  approve: false,
};
class ACLService {
  isFormDirty(): boolean {
    const sessionStorageKeys = Object.keys(sessionStorage);
    console.log(sessionStorageKeys);
    let isDirtyCheck = false;
    for (let i = 0; i < sessionStorageKeys.length; i++) {
      const key = sessionStorageKeys[i];
      isDirtyCheck = key.includes(ACL_SESSION_STORAGE.ACL_GUARD_DIRTY_STATUS_PREFIX);
      if (isDirtyCheck) break;
    }
    return isDirtyCheck;
  }

  isAclApplicable(): boolean {
    return isAclApplicable();
  }

  isRouteHasAccess(path: string): boolean {
    return true;
  }

  async getRouteAccessModel(path: string): Promise<IRouteAccessModel> {
    await new Promise((res, rej) => {
      res({ data: DUMMY_ROUTE_ACL_OBJ, status: 200 });
    });
    const routeAccessModelObj: IRouteAccessModel = {
      path: DUMMY_ROUTE_ACL_OBJ.path,
      create: DUMMY_ROUTE_ACL_OBJ.create,
      update: DUMMY_ROUTE_ACL_OBJ.update,
      read: DUMMY_ROUTE_ACL_OBJ.read,
      delete: DUMMY_ROUTE_ACL_OBJ.delete,
      softDelete: DUMMY_ROUTE_ACL_OBJ.softDelete,
      approve: DUMMY_ROUTE_ACL_OBJ.approve,
    };
    return routeAccessModelObj;
  }

  saveRouteAccessControl(routeAccessModel: IRouteAccessModel) {
    saveRouteAccessControlToStorage(routeAccessModel);
  }

  getRouteAccessControl(): IRouteAccessModel {
    return getAccessLevel();
  }

  clearFormDirty() {
    const sessionStorageKeys = Object.keys(sessionStorage);
    console.log(sessionStorageKeys);
    let isDirtyCheck = false;
    for (let i = 0; i < sessionStorageKeys.length; i++) {
      const key = sessionStorageKeys[i];
      isDirtyCheck = key.includes(ACL_SESSION_STORAGE.ACL_GUARD_DIRTY_STATUS_PREFIX);
      if (isDirtyCheck) {
        sessionStorage.removeItem(key);
      }
    }
  }
}

export default new ACLService();
