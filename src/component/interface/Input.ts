import { IACLProps } from "./common";

// Base Input Category Component
export interface ILabelProps {
  label?: any;
  hideLabel?: boolean;
  labelClassNames?: string;
  labelStyleObj?: any;
  isInvalid?: boolean;
  mandatory?: boolean;
}
export interface IInputErrorProps {
  hideErrorRow?: boolean;
  validation?: object | string;
  errorClassNames?: string;
  errorStyleObj?: any;
}
export interface IBaseInputCommonProps extends ILabelProps, IInputErrorProps, IACLProps {}

//Style Properties For Input category
export interface IInputStyleProps {
  inputBorderColor?: string;
  inputHoverBorderColor?: string;
  inputFocusColor?: string;
  inputTextColor?: string;
  inputBackgroundColor?: string;
  inputHoverBackgroundColor?: string;
  inputFontSize?: string;
  inputPaddingV?: string;
  inputPaddingH?: string;
  marginRight?: string;
  marginLeft?: string;
  marginTop?: string;
  marginBottom?: string;
  inputHeight?: string;
  inputFocusBorderColor?: string;
  inputWidth?: string;
  inputBorderWidth?: string;
  inputBorderRadius?: string;
  inputBoxShadow?: string;
  inputDisabledBackgroundColor?: string;
  inputDisabledBorderColor?: string;
  inputPlaceHolderTextColor?: string;
  inputTextAlign?: string;
  inputFocusBorderWidth?: string;
  borderStyle?: () => object;
  focusBorderStyle?: () => object;
}
export interface IErrorStyleProps {
  inputErrorFontColor?: string;
  inputErrorTextSize?: string;
}
export interface IInputCommonStyleProps {
  variant?: string;
  errorType?: any;
  styleObj?: IInputStyleProps | IErrorStyleProps;
  mandatory?: boolean;
}
