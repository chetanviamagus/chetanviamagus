import React from "react";
import { INPUT_BOX_STYLES } from "asset/base-theme";
import BaseInputMaskBox, { IBaseInputMaskBoxProps } from "component/base/BaseInputMaskBox";
import { IInputCommonStyleProps } from "component/interface/Input";

import { generateClasses } from "util/Util";

interface IInputMaskBoxProps extends IBaseInputMaskBoxProps, IInputCommonStyleProps {}

const InputMaskBox: React.FC<IInputMaskBoxProps> = (props: IInputMaskBoxProps) => {
  const { variant, styleObj, ...BaseInputProps } = props;
  const getInputClassNames = () => {
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
      <BaseInputMaskBox className={getInputClassNames()} {...BaseInputProps} />
    </>
  );
};

export default InputMaskBox;
