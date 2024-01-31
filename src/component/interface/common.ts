export interface IACLGuard {
  isOn?: boolean;
  isFormDirty?: boolean;
}

export interface IRouteAccessModel {
  path: string;
  create: boolean;
  update: boolean;
  read: boolean;
  delete: boolean;
  softDelete: boolean;
  approve: boolean;
}

export interface IACLProps {
  isdisabledbyacl?: boolean;
  isignoreaccesslevel?: boolean;
  reportFormDirty?: () => void;
}
