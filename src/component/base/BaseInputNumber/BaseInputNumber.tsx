import InputError from "component/InputError";
import Label from "component/Label/Label";
import { IBaseInputCommonProps } from "component/interface/Input";
import { InputNumber, InputNumberProps } from "primereact/inputnumber";
import React from "react";

export interface IBaseInputNumberProps extends InputNumberProps, IBaseInputCommonProps {
  onlyNumeric?: any;
}
const BaseInput: React.FC<IBaseInputNumberProps> = (props: IBaseInputNumberProps) => {
  const {
    hideLabel,
    hideErrorRow,
    label,
    labelClassNames,
    labelStyleObj,
    errorClassNames,
    validation,
    ...PrimeReactProps
  } = props;

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
      <InputNumber {...PrimeReactProps} />
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

export default BaseInput;
