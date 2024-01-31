import React from "react";
import { TEXT_AREA_BOX_STYLES } from "asset/base-theme";
import { IInputCommonStyleProps } from "component/interface/Input";
import BaseInputTextArea, { IBaseInputTextAreaProps } from "component/base/BaseInputTextArea";
import { generateClasses } from "util/Util";

interface IInputTextAreaBoxProps extends IBaseInputTextAreaProps, IInputCommonStyleProps {
  maxCount?: number;
}
const InputTextAreaBoxWithoutMemo: React.FC<IInputTextAreaBoxProps> = (
  props: IInputTextAreaBoxProps
) => {
  const { variant, styleObj, ...BaseInputProps } = props;
  const { value, onChange, placeholder, label, validation, maxCount } = BaseInputProps;
  const getClassNames = () => {
    const styleObject = {
      ...TEXT_AREA_BOX_STYLES,
      overrideStyle: styleObj,
      overrideClasses: props.className,
      isDisabled: props.disabled,
      isInvalid: validation ? true : false,
      removeStyleProperty: [],
      removeClasses: [],
    };

    return generateClasses(styleObject, variant);
  };

  return (
    <>
      <BaseInputTextArea
        {...BaseInputProps}
        className={getClassNames()}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        label={label}
        validation={validation}
        maxCount={maxCount}
      />
    </>
  );
};

// memoization

const InputTextArea = React.memo(InputTextAreaBoxWithoutMemo);
// redux wiring

// exports
export default InputTextArea;
