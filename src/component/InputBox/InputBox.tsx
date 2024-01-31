import { INPUT_BOX_STYLES } from "asset/base-theme";
import BaseInput, { IBaseInputProps } from "component/base/BaseInput";
import { IInputCommonStyleProps } from "component/interface/Input";
import React, { memo } from "react";
import { generateClasses } from "util/Util";

interface IInputBoxProps extends IBaseInputProps, IInputCommonStyleProps {}

const InputBox: React.FC<IInputBoxProps> = (props: IInputBoxProps) => {
  const { variant, styleObj, ...BaseInputProps } = props;
  const getClassNames = () => {
    const styleObject = {
      ...INPUT_BOX_STYLES,
      overrideStyle: styleObj,
      overrideClasses: props.className,
      isDisabled: props.disabled,
      isInvalid: props.validation ? true : false,
      removeStyleProperty: [],
      removeClasses: [],
    };

    return generateClasses(styleObject, variant);
  };

  return (
    <>
      <BaseInput {...BaseInputProps} className={getClassNames()} validation={props.validation} />
    </>
  );
};

// redux wiring

// exports
export default memo(InputBox);
