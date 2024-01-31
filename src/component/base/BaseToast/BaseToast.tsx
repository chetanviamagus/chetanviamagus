import { Toast, ToastProps } from "primereact/toast";
import React from "react";

export interface IBaseToastProps extends ToastProps {
  toastContent: any;
  className?: string;
  style?: object;
  ref?: React.Ref<HTMLInputElement>;
}
const BaseToast: React.FC<IBaseToastProps> = React.forwardRef((props: any, ref: any) => {
  const { position } = props;

  return (
    <>
      <Toast position={position} ref={ref} appendTo={"self"} />
    </>
  );
});

export default BaseToast;
