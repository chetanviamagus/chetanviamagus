import { CHECKBOX_PRIMARY_STYLE_CHECKED, CHECK_BOX_STYLES } from "asset/base-theme";
import BaseCheckBox, { IBaseCheckBoxProps } from "component/base/BaseCheckBox";
import { IInputCommonStyleProps } from "component/interface/Input";
import React from "react";
import { INPUT_ERROR_TYPE } from "util/Constant";
import { generateClasses } from "util/Util";

interface ICheckBoxProps extends IBaseCheckBoxProps, IInputCommonStyleProps {}
const CheckBoxWithoutMemo: React.FC<ICheckBoxProps> = (props: ICheckBoxProps) => {
  const { variant, styleObj, ...BaseCheckBoxProps } = props;
  const getClassNames = () => {
    let styleObject = {
      ...CHECK_BOX_STYLES,
      overrideStyle: styleObj,
      overrideClasses: props.className,
      isDisabled: props.disabled,
      applyErrorStyle: props.validation && props.errorType == INPUT_ERROR_TYPE.BORDER,
      removeStyleProperty: [],
      removeClasses: [],
    };

    if (props.checked) {
      styleObject = { ...styleObject, primaryStyle: CHECKBOX_PRIMARY_STYLE_CHECKED };
      return generateClasses(styleObject, "PRIMARY");
    } else {
      return generateClasses(styleObject, variant);
    }
  };

  return (
    <>
      <BaseCheckBox className={getClassNames()} {...BaseCheckBoxProps} />
    </>
  );
};

// memoization

const CheckBox = React.memo(CheckBoxWithoutMemo);
// redux wiring

// exports
export default CheckBox;
