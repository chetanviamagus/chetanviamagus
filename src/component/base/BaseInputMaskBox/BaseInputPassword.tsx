import React from "react";
import { InputMask, InputMaskProps } from "primereact/inputmask";
import { IBaseInputCommonProps } from "component/interface/Input";
import InputError from "component/InputError";
import Label from "component/Label";

export interface IBaseInputMaskBoxProps extends InputMaskProps, IBaseInputCommonProps {}

const BaseInputMaskBox: React.FC<IBaseInputMaskBoxProps> = (props: IBaseInputMaskBoxProps) => {
  const {
    hideLabel,
    label,
    labelClassNames,
    labelStyleObj,
    validation,
    hideErrorRow,
    errorClassNames,
    errorStyleObj,
    ...PrimeReactProps
  } = props;

  const { placeholder, className, value, style, name, onChange } = PrimeReactProps;
  return (
    <div className="group grid">
      {!hideLabel && (
        <Label
          label={label}
          labelClassNames={labelClassNames}
          labelStyleObj={labelStyleObj}
          isInvalid={validation}
        />
      )}
      <InputMask
        className={className}
        value={value}
        style={style}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        mask="99/99/9999"
        {...PrimeReactProps}
      />
      {!hideErrorRow && (
        <InputError
          validation={validation}
          hideErrorRow={hideErrorRow}
          errorClassNames={errorClassNames}
        />
      )}
    </div>
  );
};

export default BaseInputMaskBox;
