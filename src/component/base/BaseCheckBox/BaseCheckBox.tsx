import InputError from "component/InputError";
import Label from "component/Label/Label";
import { IBaseInputCommonProps } from "component/interface/Input";
import { Checkbox, CheckboxProps } from "primereact/checkbox";
import React from "react";

export interface IBaseCheckBoxProps extends CheckboxProps, IBaseInputCommonProps {}

const BaseCheckBox: React.FC<IBaseCheckBoxProps> = (props: IBaseCheckBoxProps) => {
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
      <div className="custom-checkbox flex items-center gap-x-3">
        <Checkbox
          className={className}
          value={value}
          style={style}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          {...PrimeReactProps}
        />
        {!hideLabel && <Label label={label} labelClassNames={labelClassNames} />}
      </div>
      {hideErrorRow ? null : (
        <InputError
          validation={validation}
          hideErrorRow={hideErrorRow}
          errorClassNames={errorClassNames}
        />
      )}
    </div>
  );
};

export default BaseCheckBox;
