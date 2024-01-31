import InputError from "../../InputError";
import Label from "../../Label";
import { withAuth } from "../../hoc/withAuth";
import { IBaseInputCommonProps } from "../../interface/Input";
import { InputText, InputTextProps } from "primereact/inputtext";
import React from "react";

export interface IBaseInputProps extends InputTextProps, IBaseInputCommonProps {
  hideLabel?: boolean;
  label?: string;
  labelClassNames?: string;
  labelStyleObj?: React.CSSProperties;
  hideErrorRow?: boolean;
  errorClassNames?: string;
  errorStyleObj?: React.CSSProperties;
  disabled?: boolean;
  isdisabledbyacl?: boolean;
  isignoreaccesslevel?: boolean;
}

const BaseInput: React.FC<IBaseInputProps> = (props: IBaseInputProps) => {
  const {
    hideLabel,
    label,
    labelClassNames,
    labelStyleObj,
    validation,
    hideErrorRow,
    errorClassNames,
    errorStyleObj,
    disabled,
    isdisabledbyacl,
    isignoreaccesslevel,
    reportFormDirty,
    ...PrimeReactProps
  } = props;

  const { placeholder, className, value, style, name, onChange } = PrimeReactProps;

  return (
    <div>
      {!hideLabel && (
        <div className="flex flex-row">
          <Label
            label={label}
            labelClassNames={labelClassNames}
            labelStyleObj={labelStyleObj}
            isInvalid={validation}
          />
        </div>
      )}
      <InputText
        className={className}
        value={value}
        style={style}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        {...PrimeReactProps}
        type="password"
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

export default withAuth(BaseInput);
