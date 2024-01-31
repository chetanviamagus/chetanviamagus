
import { Toast, ToastProps } from "primereact/toast";
import successToastIcon from "asset/img/icons/success_toast.svg";
import smallCloseIcon from "asset/img/icons/small-close.svg";
import checkInfo from "asset/img/icons/toast-info.svg";
import checkFail from "asset/img/icons/toast-error.svg";
import checkWarning from "asset/img/icons/toast-alert.svg";
import React from "react";
import { generateClasses } from "util/Util";
import { INPUT_ERROR_TYPE } from "util/Constant";
import { TOAST_STYLES } from "asset/base-theme";
import Text from "component/Text/Text";
export interface IToastProps extends ToastProps {
  message: any;
  className?: string;
  variant?: string;
  style?: object;
  ref?: React.Ref<HTMLInputElement>;
}

const ToastCustom: React.FC<IToastProps> = React.forwardRef((props: any, ref: any) => {
  const getClassNames = () => {
    const styleObject = {
      ...TOAST_STYLES,
      overrideStyle: props.styleObj,
      overrideClasses: props.className,
      isDisabled: props.disabled,
      applyErrorStyle: props.validation && props.errorType == INPUT_ERROR_TYPE.BORDER,
      removeStyleProperty: [],
      removeClasses: [],
    };

    return generateClasses(styleObject, props.variant);
  };
  const onClose = (ref: any) => {
    ref.clear();
  };
  React.useImperativeHandle(ref, () => ({
    showFunction() {
      let checkIcon, closeIcon, bgColor;
      switch (props.variant) {
        case "PRIMARY":
          checkIcon = successToastIcon;
          closeIcon = smallCloseIcon;
          break;
        case "SECONDARY":
          checkIcon = checkInfo;
          closeIcon = smallCloseIcon;
          break;
        case "TERTIARY":
          checkIcon = checkWarning;
          closeIcon = smallCloseIcon;
          break;
        case "QUATERNARY":
          checkIcon = checkFail;
          closeIcon = smallCloseIcon;
          break;
        default:
          checkIcon = successToastIcon;
          closeIcon = smallCloseIcon;
      }
      ref.show({
        summary: (
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center justify-between">
              <img className="w-6 h-6" src={checkIcon} alt="" />
              <Text className="break-words w-56" label={props.message} />
            </div>
            <img
              src={closeIcon}
              alt="X"
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                onClose(ref);
                if (props.onRemove) {
                  props.onRemove();
                }
              }}
            />
          </div>
        ),
        contentClassName: getClassNames() + "",
        //sticky: true,
      });
    },
  }));
  const { position, onRemove } = props;
  return (
    <>      
      <Toast position={position} ref={(el) => (ref = el)} appendTo={"self"} {...props} />
    </>
  );
});

// Memoization
export default React.memo(ToastCustom);
// redux wiring

