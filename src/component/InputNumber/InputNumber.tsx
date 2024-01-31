import React from "react";
import BaseInputNumber, { IBaseInputNumberProps } from "component/base/BaseInputNumber";
import { INPUT_NUMBER_STYLES } from "asset/base-theme";
import { IInputCommonStyleProps } from "component/interface/Input";
import { generateClasses } from "util/Util";
interface IInputNumberProps extends IBaseInputNumberProps, IInputCommonStyleProps {}
const InputNumberWithoutMemo: React.FC<IInputNumberProps> = (props: IInputNumberProps) => {
  const { variant, styleObj, errorType, ...BaseInputProps } = props;
  const getClassNames = () => {
    const styleObject = {
      ...INPUT_NUMBER_STYLES,
      overrideStyle: props.styleObj,
      overrideClasses: props.className,
      isDisabled: props.disabled,
      isInvalid: props.validation ? true : false,
      removeStyleProperty: [],
      removeClasses: [],
    };
    return generateClasses(styleObject, props.variant);
  };

  const { value, onChange, name, placeholder, label, validation, onlyNumeric } = BaseInputProps;
  return (
    <>
      <BaseInputNumber
        {...BaseInputProps}
        className={getClassNames()}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        label={label}
        validation={validation}
        onlyNumeric={onlyNumeric}
      />
    </>
  );
};

// memoization

const InputNumber = React.memo(InputNumberWithoutMemo);
// redux wiring

// exports
export default InputNumber;
