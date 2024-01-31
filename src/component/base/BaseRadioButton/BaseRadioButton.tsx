import InputError from "component/InputError";
import Label from "component/Label/Label";
import { IBaseInputCommonProps } from "component/interface/Input";
import { RadioButton, RadioButtonProps } from "primereact/radiobutton";
import React from "react";

export interface IBaseRadioButtonProps extends RadioButtonProps, IBaseInputCommonProps {}
const BaseRadioButton: React.FC<IBaseRadioButtonProps> = (props: IBaseRadioButtonProps) => {
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

  const { className, value, style, name, onChange } = PrimeReactProps;

  return (
    <div className="group grid">
      {!hideLabel && <Label label={label} labelClassNames={labelClassNames} />}

      <RadioButton
        className={className}
        value={value}
        style={style}
        onChange={onChange}
        name={name}
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

export default BaseRadioButton;
