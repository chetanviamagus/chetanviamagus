export interface IBaseButtonCommonProps {
  isdisabledbyacl?: boolean;
  isignoreaccesslevel?: boolean;
}

export interface IButtonStyleProps {
  buttonBorderColor?: string;
  buttonHoverBorderColor?: string;
  buttonFocusColor?: string;
  buttonTextColor?: string;
  buttonBackgroundColor?: string;
  buttonHoverBackgroundColor?: string;
  buttonFontSize?: string;
  buttonPaddingV?: string;
  buttonPaddingH?: string;
  marginRight?: string;
  marginLeft?: string;
  marginTop?: string;
  marginBottom?: string;
  buttonHeight?: string;
  buttonFocusBorderColor?: string;
  buttonWidth?: string;
  buttonBorderWidth?: string;
  buttonBorderRadius?: string;
  buttonBoxShadow?: string;
  buttonDisabledBackgroundColor?: string;
  buttonDisabledBorderColor?: string;
  buttonPlaceHolderTextColor?: string;
  buttonTextAlign?: string;
  buttonFocusBorderWidth?: string;
  borderStyle?: () => object;
  focusBorderStyle?: () => object;
}
export interface IButtonCommonStyleProps {
  variant?: string;
  errorType?: any;
  styleObj?: IButtonStyleProps;
  args?: any;
  onClickWithLoader?: (e?: any) => Promise<any>;
  iconImg?: any;
}
