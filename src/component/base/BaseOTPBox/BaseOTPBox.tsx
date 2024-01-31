import InputError from "component/InputError";
import Label from "component/Label";
import OTPInput, { ResendOTP } from "otp-input-react";
import React from "react";
import { ILabelProps, IErrorStyleProps } from "component/interface/Input";
export interface IBaseOTPCommonProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    ILabelProps,
    IErrorStyleProps {
  otpType?: string;
  resendOTPClassName?: string;
  autoFocus?: boolean;
  OTPLength: number;
  onResendClick?: (e?: any) => void;
  hideErrorRow?: boolean;
  validation?: object;
  errorClassNames?: string;
  styleResendObj?: object;
}
const BaseOTPBox: React.FC<IBaseOTPCommonProps> = (props: IBaseOTPCommonProps) => {
  const {
    hideLabel,
    label,
    labelClassNames,
    OTPLength,
    value,
    className,
    otpType,
    resendOTPClassName,
    disabled,
    hideErrorRow,
    validation,
    errorClassNames,
    placeholder,
    onChange,
    onResendClick,
  } = props;

  return (
    <div className="group grid">
      {!hideLabel && <Label label={label} labelClassNames={labelClassNames} />}
      <OTPInput
        value={value}
        onChange={onChange}
        autoFocus
        OTPLength={OTPLength}
        otpType={otpType}
        disabled={disabled}
        inputClassName={className}
        placeholder={placeholder}
      />
      <ResendOTP onResendClick={onResendClick} className={resendOTPClassName} />
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

export default BaseOTPBox;
