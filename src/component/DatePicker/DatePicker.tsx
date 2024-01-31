import {
  COMMON_ERROR_STYLE,
  COMMON_LABEL_STYLE,
  INPUT_BOX_ERROR,
  INPUT_BOX_PRIMARY_STYLE,
  INPUT_BOX_SECONDARY_STYLE,
} from "asset/base-theme";
import BaseDatePicker, { IBaseDatePickerProps } from "component/base/BaseDatePicker";
import { IInputCommonStyleProps } from "component/interface/Input";
import React from "react";
import { INPUT_ERROR_TYPE } from "util/Constant";
import { generateClasses } from "util/Util";

interface IDatPickerProps extends IBaseDatePickerProps, IInputCommonStyleProps {}

const DatePicker: React.FC<IDatPickerProps> = (props: IDatPickerProps) => {
  const { variant, styleObj, ...BaseDatePickerProps } = props;
  const getClassNames = () => {
    const styleObject = {
      primaryStyle: INPUT_BOX_PRIMARY_STYLE,
      secondaryStyle: INPUT_BOX_SECONDARY_STYLE,
      overrideStyle: styleObj || {},
      overrideClasses: props.className,
      isDisabled: props.disabled,
      errorStyle: INPUT_BOX_ERROR,
      applyErrorStyle: props.validation && props.errorType == INPUT_ERROR_TYPE.BORDER,
    };

    return generateClasses(styleObject, variant);
  };

  const getPanelClassNames = () => {
    return "border p-2 rounded-lg  border-inputBorderColor bg-white text-inputTextColor";
  };

  //Label Styling
  const getLabelClassNames = () => {
    const styleOBJECT = {
      primaryStyle: COMMON_LABEL_STYLE,
      overrideStyle: props.labelStyleObj,
    };

    return generateClasses(styleOBJECT, variant);
  };

  //Error Styling
  const getErrorClassNames = () => {
    const errorStyleObj = { COMMON_ERROR_STYLE, ...(props.errorStyleObj && props.errorStyleObj) };
    return `${errorStyleObj.inputErrorColor} ${errorStyleObj.inputErrorTextSize} `;
  };

  return (
    <React.Fragment>
      <BaseDatePicker
        style={{ background: "#fff", ...props.style }}
        panelStyle={{ top: "44px" }}
        panelClassName={getPanelClassNames()}
        className={getClassNames()}
        inputClassName="outline-none"
        labelClassNames={getLabelClassNames()}
        errorClassNames={getErrorClassNames()}
        {...BaseDatePickerProps}
      />
    </React.Fragment>
  );
};

export default DatePicker;
