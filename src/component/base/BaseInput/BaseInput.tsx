import InputError from "../../InputError";
import Label from "../../Label";
import { withAuth } from "../../hoc/withAuth";
import { IBaseInputCommonProps } from "../../interface/Input";
import { InputText, InputTextProps } from "primereact/inputtext";
import React, { useState } from "react";
import eyeOpenedIcon from "asset/img/icons/eye-opened.svg";
import eyeClosedIcon from "asset/img/icons/eye-closed.svg";

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
  rightCTA?: React.ReactNode | string;
  onClickRightCTA?: () => void;
  ref?: React.ForwardedRef<HTMLInputElement>;
}

const BaseInput: React.FC<IBaseInputProps> = (props: IBaseInputProps) => {
  const {
    disabled,
    errorClassNames,
    errorStyleObj,
    hideErrorRow,
    hideLabel,
    isdisabledbyacl,
    isignoreaccesslevel,
    label,
    labelClassNames,
    labelStyleObj,
    onClickRightCTA,
    reportFormDirty,
    rightCTA,
    validation,
    mandatory,
    ref,
    ...PrimeReactProps
  } = props;

  const { placeholder, className, value, style, name, onChange, type } = PrimeReactProps;

  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full">
      {!hideLabel && (
        <div className="flex flex-row">
          <Label
            label={label}
            labelClassNames={labelClassNames}
            labelStyleObj={labelStyleObj}
            isInvalid={validation}
            mandatory={props.mandatory}
          />
          {rightCTA && (
            <button
              className="ml-auto cursor-pointer text-body-copy-2 text-primary-link-btn-color hover:underline"
              onClick={onClickRightCTA}
            >
              {rightCTA}
            </button>
          )}
        </div>
      )}
      <div className="relative">
        <InputText
          {...PrimeReactProps}
          className={className + `${type === "password" ? "pr-10" : ""}`}
          value={value}
          style={style}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          ref={ref}
          type={type === "password" && visible ? "text" : type}
        />
        {type === "password" && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
            onClick={() => {
              setVisible(!visible);
            }}
          >
            <img src={visible ? eyeClosedIcon : eyeOpenedIcon} alt="eye" />
          </button>
        )}
      </div>
      {!hideErrorRow && (
        <InputError
          validation={validation}
          hideErrorRow={hideErrorRow}
          errorClassNames={errorClassNames + " mt-1"}
        />
      )}
    </div>
  );
};

export default withAuth(BaseInput);
