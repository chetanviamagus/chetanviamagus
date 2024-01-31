import { OTP_BOX_STYLES, OTP_RESEND_STYLES } from "asset/base-theme";
import BaseOTPBox, { IBaseOTPCommonProps } from "component/base/BaseOTPBox";
import { IInputCommonStyleProps } from "component/interface/Input";
import React from "react";
import { generateClasses } from "util/Util";

interface OTPBoxProps extends IBaseOTPCommonProps, IInputCommonStyleProps {}

const OTPBoxWithoutMemo: React.FC<OTPBoxProps> = (props: OTPBoxProps) => {
  const {
    value,
    onChange,
    placeholder,
    label,
    className,
    OTPLength,
    autoFocus,
    otpType,
    resendOTPClassName,
    onResendClick,
    disabled,
    hideErrorRow,
    validation,
    errorClassNames,
    labelClassNames,
  } = props;
  const getClassNames = () => {
    interface StyleObjectInterface {
      primaryStyle: object;
      secondaryStyle?: object;
      tertiaryStyle?: object;
      quaternaryStyle?: object;
      errorStyle?: object;
      overrideStyle?: object;
      overrideClasses?: string;
      disabledStyleProperty?: string[];
      removeStyleProperty?: string[];
      removeClasses?: string[];
      isDisabled?: boolean;
      applyErrorStyle?: boolean;
      [key: string]: any; // additional property Allowed (for ternaryStyle or Other)
    }
    const styleObject: StyleObjectInterface = {
      ...OTP_BOX_STYLES,
      overrideStyle: props.styleObj,
      overrideClasses: className,
      isDisabled: props.disabled,
      isInvalid: props.validation ? true : false,
      removeStyleProperty: [],
      removeClasses: [],
    };

    const classNamesObject = generateClasses(styleObject, props.variant);
    const resendStyleObject: StyleObjectInterface = {
      disabledStyleProperty: [
        "inputDisabledBackgroundColor",
        "inputDisabledBorderColor",
        "inputDisabledTextColor",
        "inputDisabledBorderSize",
      ], // Property name for disable classes
      ...OTP_RESEND_STYLES,
      overrideStyle: props.styleResendObj,
      overrideClasses: resendOTPClassName,
      isDisabled: props.disabled,
      isInvalid: props.validation ? true : false,
      removeStyleProperty: [],
      removeClasses: [],
    };

    const resendClassNameObject = generateClasses(resendStyleObject, props.variant);

    return [classNamesObject, resendClassNameObject];
  };

  const getClassNameValues = getClassNames();
  const classNames = getClassNameValues[0];
  const resendClassNames = getClassNameValues[1];

  return (
    <>
      <BaseOTPBox
        {...props}
        className={classNames}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        label={label}
        labelClassNames={labelClassNames}
        OTPLength={OTPLength}
        autoFocus={autoFocus}
        otpType={otpType}
        resendOTPClassName={resendClassNames}
        onResendClick={onResendClick}
        disabled={disabled}
        hideErrorRow={hideErrorRow}
        validation={validation}
        errorClassNames={errorClassNames}
      />
    </>
  );
};

// Memoization

const OTPBox = React.memo(OTPBoxWithoutMemo);
// redux wiring

// exports
export default OTPBox;
