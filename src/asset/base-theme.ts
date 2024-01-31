import { generateBorderStyle } from "util/Util";

export const COMMON_INPUT_STYLE = {
  inputTextAlign: "text-left",
  inputMarginRight: "",
  inputMarginLeft: "",
  inputMarginTop: "",
  inputMarginBottom: "",
  inputFontSize: "text-body-copy-2",
  inputPaddingV: "px-3",
  inputPaddingH: "py-2",
  inputHeight: "h-9",
  inputWidth: "w-full",
  borderStyle: " border ",
  inputBorderRadius: "rounded-md",
  inputFocusRingWidth: "outline-none",
  inputFocusBackgroundColor: "focus:bg-oauth-btn-hover",
  inputFocusBorderColor:
    "focus:border-primary-oauth-btn-border-hover dark:focus:border-dark-oauth-btn-border-hover",
  inputFocusBorderWidth: "focus:border",
  inputFocusShadow: "",
  inputHoverBackgroundColor: "",
  inputHoverBorderColor:
    "hover:border-primary-oauth-btn-border-hover dark:hover:border-dark-oauth-btn-border-hover",
  inputTextColor: "text-black dark:text-white",
  inputBorderColor: "border-primary-oauth-btn-border dark:border-dark-oauth-btn-border",
  inputBackgroundColor: "bg-primary-oauth-btn dark:bg-dark-oauth-btn",
  inputPlaceHolderTextColor: "placeholder-primary-text-v2 dark:placeholder-dark-text-v2",
  inputBoxShadow: "",
  disabled: {
    inputBorderColor: "border-primary-gray-500",
    inputBackgroundColor: "bg-primary-gray-200",
    inputPlaceHolderTextColor: "placeholder-primary-text-v2 dark:bg-dark-text-v2",
  },

  error: {
    inputBorderColor: "border-primary-error-color",
    inputTextColor: "",
    inputBackgroundColor: "bg-primary-oauth-btn dark:bg-dark-oauth-btn",
    inputHoverBorderColor: "hover:border-primary-error-color",
    inputFocusBorderColor: "focus:border-primary-error-color",
  },
};

const COMMON_INPUT_BOX_STYLE = {
  ...COMMON_INPUT_STYLE,
};
// INPUT Box Variants
export const INPUT_BOX_PRIMARY_STYLE = {
  ...COMMON_INPUT_BOX_STYLE,
  truncate: "truncate",
};

export const INPUT_BOX_SECONDARY_STYLE = {
  ...COMMON_INPUT_BOX_STYLE,

  //Input: Color
  inputBorderColor: "border-primary-violet-600",
  inputHoverBorderColor: "hover:border-primary-gray-400",
  inputFocusBackgroundColor: "focus:bg-white",
  inputFocusColor: "outline-none",
  inputTextColor: "text-primary-gray-800",
  inputPlaceHolderTextColor: "placeholder-primary-gray-400",
  inputBackgroundColor: "bg-white",
  inputFocusBorderColor: "focus:border-primary-violet-600",
  inputBoxShadow: "",
  inputDisabledBackgroundColor: "bg-primary-gray-200",
  inputDisabledBorderColor: "border-primary-gray-500",

  // Input:Size
  inputFontSize: "text-sm",
  inputPaddingV: "px-2",
  inputPaddingH: "py-2",
  inputHeight: "h-10",
  inputWidth: "w-100",
  inputFocusBorderWidth: "focus:border-2",
  inputTextAlign: "text-left",
};

//Styling Component incase of error.
export const INPUT_BOX_ERROR = {};

export const INPUT_BOX_TERTIARY_STYLE = {
  ...COMMON_INPUT_BOX_STYLE,
};

export const INPUT_BOX_STYLES = {
  primaryStyle: INPUT_BOX_PRIMARY_STYLE,
  secondaryStyle: INPUT_BOX_SECONDARY_STYLE,
  tertiaryStyle: INPUT_BOX_TERTIARY_STYLE,
};

// INPUT Number Variants
export const INPUT_NUMBER_PRIMARY_STYLE = {
  ...COMMON_INPUT_BOX_STYLE,
};

export const INPUT_NUMBER_SECONDARY_STYLE = {
  ...COMMON_INPUT_BOX_STYLE,

  //Input: Color
  inputBorderColor: "border-primary-violet-600",
  inputHoverBorderColor: "hover:border-primary-gray-400",
  inputFocusBackgroundColor: "focus:bg-white",
  inputFocusColor: "outline-none",
  inputTextColor: "text-primary-gray-800",
  inputPlaceHolderTextColor: "placeholder-primary-gray-400",
  inputBackgroundColor: "bg-white",
  inputFocusBorderColor: "focus:border-primary-violet-600",
  inputBoxShadow: "",
  inputDisabledBackgroundColor: "bg-primary-gray-200",
  inputDisabledBorderColor: "border-primary-gray-500",

  // Input:Size
  inputFontSize: "text-sm",
  inputPaddingV: "px-2",
  inputPaddingH: "py-2",
  inputHeight: "h-10",
  inputWidth: "w-100",
  inputFocusBorderWidth: "focus:border-2",
  inputTextAlign: "text-left",
};

export const INPUT_NUMBER_TERTIARY_STYLE = {
  ...COMMON_INPUT_BOX_STYLE,
};

export const INPUT_NUMBER_STYLES = {
  primaryStyle: INPUT_NUMBER_PRIMARY_STYLE,
  secondaryStyle: INPUT_NUMBER_SECONDARY_STYLE,
  tertiaryStyle: INPUT_NUMBER_TERTIARY_STYLE,
};

export const COMMON_LABEL_STYLE = {
  inputLabelColor: "text-primary-gray-800 dark:text-white",
  inputLabelFontSize: "text-body-copy-2",
  inputTextAlign: "text-left",
  disabledStyle: {
    inputLabelColor: "text-primary-gray-200",
  },
  errorStyle: {
    inputLabelColor: "text-primary-red-500",
  },
};

export const LABEL_STYLE_PRIMARY = {
  ...COMMON_LABEL_STYLE,
};

export const LABEL_STYLES = {
  primaryStyle: LABEL_STYLE_PRIMARY,
};

//Styling Error Text
export const COMMON_ERROR_STYLE = {
  inputErrorColor: "text-primary-error-color",
  inputErrorTextSize: "text-xs",
};

export const BASE_INPUT_TEXT_AREA_STYLE = {
  ...COMMON_INPUT_STYLE,
  inputBackgroundColor: "",
  // inputHeight: "h-100",
};

export const INPUT_PRIMARY_TEXT_AREA_STYLE = {
  ...BASE_INPUT_TEXT_AREA_STYLE,
};

export const INPUT_SECONDARY_TEXT_AREA_STYLE = {
  ...BASE_INPUT_TEXT_AREA_STYLE,
};

export const TEXT_AREA_BOX_STYLES = {
  primaryStyle: INPUT_PRIMARY_TEXT_AREA_STYLE,
  secondaryStyle: INPUT_SECONDARY_TEXT_AREA_STYLE,
};

export const BASE_PANEL_STYLE = {
  inputBorderColorPanel: "border-primary-gray-500 dark:border-gray-900",
  inputTextColorPanel: "",
  inputPaddingVPanel: "",
  inputPaddingHPanel: "py-2",
  inputBorderRadiusPanel: "rounded-lg",
  inputBackgroundColorPanel: "bg-white dark:bg-gray-900",
  inputFontSizePanel: "text-body-copy-2",
  inputTextAlignPanel: "text-left",
  disabled: {
    inputBorderColor: "border-primary-gray-500 ",
    inputBackgroundColor: "bg-primary-gray-100",
    inputHoverBackgroundColor: "hover:bg-dark-neutral-gray-100",
  },
  borderStyle: generateBorderStyle(
    { inputBorderWidth: "border-2" },
    { inputBorderDirection: "-b" }
  ),
};

export const PANEL_PRIMARY_STYLE = {
  ...BASE_PANEL_STYLE,
  inputHeightPanel: "!max-h-64",
  borderStyle: generateBorderStyle(
    { inputBorderWidth: "border-none" },
    { inputBorderDirection: "" }
  ),
  inputMarginRightPanel: "mr-6",
  inputMarginLeftPanel: "",
  inputMarginTopPanel: "!mt-2",
  inputMarginBottomPanel: "",
  disabled: {
    inputBorderColor: "border-primary-gray-500",
    inputBackgroundColor: "bg-primary-gray-200",
    inputPlaceHolderTextColor: "placeholder-text-primary-gray-400",
  },
};

export const BASE_DROPDOWN_STYLE = {
  ...COMMON_INPUT_STYLE,
  inputPaddingH: "py-2",
};

export const DROPDOWN_PRIMARY_STYLE = {
  ...BASE_DROPDOWN_STYLE,
};

export const DROPDOWN_SECONDARY_STYLE = {
  ...BASE_DROPDOWN_STYLE,
  inputBackgroundColor: "bg-transparent",
  inputFontSize: "text-body-copy-2 font-semibold",
  inputPaddingV: "px-0",
  inputPaddingH: "py-0",
  inputHeight: "h-6",
  inputWidth: "w-40",
  borderStyle: " border-none ",
  inputBorderRadius: "rounded-none",
  inputFocusRingWidth: "outline-none",
  inputFocusBackgroundColor: "focus:bg-oauth-btn-hover",
  inputFocusBorderColor:
    "focus:border-primary-oauth-btn-border-hover dark:focus:border-dark-oauth-btn-border-hover",
  inputFocusBorderWidth: "focus:border-none",
};

export const DROPDOWN_TERTIARY_STYLE = {
  ...BASE_DROPDOWN_STYLE,
};

export const DROPDOWN_QUATERNARY_STYLE = {
  ...BASE_DROPDOWN_STYLE,
  inputBorderColor: "border-primary-gray-600",
};

export const DROP_DOWN_STYLES = {
  primaryStyle: DROPDOWN_PRIMARY_STYLE,
  secondaryStyle: DROPDOWN_SECONDARY_STYLE,
  tertiaryStyle: DROPDOWN_TERTIARY_STYLE,
  quaternaryStyle: DROPDOWN_QUATERNARY_STYLE,
};

//OTPBoxStyle

export const OTP_BOX_PRIMARY_STYLE = {
  borderStyle: "border",
  inputBorderColor: "border-primary-gray-200",
  inputTextColor: "text-primary-gray-300",
  inputFontSize: "text-xsm",
};

export const OTP_BOX_SECONDARY_STYLE = {
  borderStyle: "border",
  inputBorderColor: "border-primary-gray-400",
  inputTextColor: "text-primary-gray-800",
  inputFontSize: "text-sm",
};

export const OTP_BOX_STYLES = {
  primaryStyle: OTP_BOX_PRIMARY_STYLE,
  secondaryStyle: OTP_BOX_SECONDARY_STYLE,
};

export const OTP_RESEND_PRIMARY_STYLE = {
  inputTextColor: "text-primary-navy-800",
  inputFontSize: "text-xsm",
};

export const OTP_RESEND_SECONDARY_STYLE = {
  borderStyle: "border",
  inputBorderColor: "border-primary-gray-400",
  inputTextColor: "text-primary-gray-800",
  inputFontSize: "text-sm",
};

export const OTP_RESEND_STYLES = {
  primaryStyle: OTP_RESEND_PRIMARY_STYLE,
  secondaryStyle: OTP_RESEND_SECONDARY_STYLE,
};

// Autocomplete Variants
export const BASE_AUTOCOMPLETE_STYLE = {
  ...COMMON_INPUT_STYLE,
  inputMarginRight: "!mr-0",
  inputMarginLeft: "!ml-0",
  inputMarginTop: "!mt-0",
  inputMarginBottom: "!mb-0",

  inputPlaceHolderTextColor: "placeholder-text-primary-gray-800",
  // inputBackgroundColor: "bg-white",
  inputBorderColor: "border-transparent",
  inputWidth: "w-40",
  inputTextAlign: "text-right",
  inputTextColor: "text-primary-gray-800",
  disabled: {
    inputBorderColor: "border-primary-gray-500",
    inputBackgroundColor: "bg-primary-gray-200",
    inputPlaceHolderTextColor: "placeholder-text-primary-gray-400",
  },

  error: {
    inputBorderColor: "border-primary-red-700",
    inputTextColor: "text-primary-navy-800",
    inputBackgroundColor: "bg-white",
  },
};

export const AUTOCOMPLETE_PRIMARY_STYLE = {
  ...BASE_AUTOCOMPLETE_STYLE,
  //Input: Color
  inputBorderColor: "border-primary-gray-600",
  inputHoverBorderColor: "hover:border-primary-violet-400",
  inputFocusColor: "",
  inputTextColor: "text-primary-gray-800",
  inputPlaceHolderTextColor: "placeholder-primary-gray-800",
  // inputBackgroundColor: "bg-white",
  inputFocusBorderColor: "focus:border-primary-violet-600",
  inputBoxShadow: "",
  inputDisabledBackgroundColor: "bg-primary-gray-200",
  inputDisabledBorderColor: "border-primary-gray-500",

  // Input:Size
  inputFontSize: "text-sm",
  inputPaddingV: "px-2",
  inputPaddingH: "py-2",
  inputHeight: "h-10",
  inputWidth: "w-100",
  inputFocusBorderWidth: "focus:border-2",
  inputTextAlign: "text-left",
  inputMarginRight: "!mr-4",
  inputMarginLeft: "!ml-4",
};

export const AUTOCOMPLETE_SECONDARY_STYLE = {
  ...BASE_AUTOCOMPLETE_STYLE,
  //Input: Color
  inputBorderColor: "border-primary-violet-600",
  inputHoverBorderColor: "hover:border-primary-gray-400",
  inputFocusColor: "plum-800",
  inputTextColor: "text-primary-gray-800",
  inputPlaceHolderTextColor: "placeholder-primary-gray-400",
  inputBackgroundColor: "bg-primary-gray-200",
  inputFocusBorderColor: "focus:border-primary-violet-600",
  inputBoxShadow: "",
  inputDisabledBackgroundColor: "bg-primary-gray-200",
  inputDisabledBorderColor: "border-primary-gray-500",

  // Input:Size
  inputFontSize: "text-sm",
  inputPaddingV: "px-2",
  inputPaddingH: "py-2",
  inputHeight: "h-10",
  inputWidth: "w-100",
  inputFocusBorderWidth: "focus:border-2",
  inputTextAlign: "text-left",
};

export const AUTOCOMPLETE_STYLES = {
  primaryStyle: AUTOCOMPLETE_PRIMARY_STYLE,
  secondaryStyle: AUTOCOMPLETE_SECONDARY_STYLE,
};

// RadioButton Variants
export const RADIO_BUTTON_PRIMARY_STYLE = {
  ...COMMON_INPUT_STYLE,

  //Input: Color
  inputBorderColor: "border-primary-gray-600",
  inputHoverBorderColor: "hover:border-primary-gray-800",
  inputFocusColor: "",
  inputIconTextColor: "",
  inputPlaceHolderTextColor: "",
  inputBackgroundColor: "bg-white",
  inputFocusBorderColor: "focus:border-primary-violet-600",
  inputBoxShadow: "",

  // Input:Size
  inputIconFontSize: "",
  inputPaddingV: "",
  inputPaddingH: "",
  inputHeight: "h-5",
  inputWidth: "w-5",
  inputFocusBorderWidth: "focus:border-2",
  inputTextAlign: "",
  inputBorderRadius: "rounded-2xl",
};

export const RADIO_BUTTON_SECONDARY_STYLE = {
  ...COMMON_INPUT_STYLE,

  //Input: Color
  inputBorderColor: "border-primary-gray-200",
  inputHoverBorderColor: "hover:border-primary-gray-100",
  inputFocusColor: "plum-200",
  inputIconTextColor: "text-primary-gray-400",
  inputPlaceHolderTextColor: "placeholder-primary-gray-400",
  inputBackgroundColor: "bg-white",
  inputFocusBorderColor: "focus:border-primary-violet-300",
  inputBoxShadow: "",
  // Input:Size
  inputIconFontSize: "text-sm",
  inputPaddingV: "px-2",
  inputPaddingH: "py-2",
  inputHeight: "h-10",
  inputWidth: "w-100",
  inputFocusBorderWidth: "focus:border-2",
  inputTextAlign: "text-left",
};

export const RADIO_BUTTON_PRIMARY_STYLE_CHECKED = {
  ...COMMON_INPUT_STYLE,

  //Input: Color
  inputBorderColor: "border-primary-gray-600",
  inputHoverBorderColor: "hover:border-primary-gray-800",
  inputFocusColor: "",
  inputHoverBackgroundColor: "hover:bg-primary-navy-500",
  inputBackgroundColor: "bg-primary-navy-800",
  inputFocusBorderColor: "focus:border-primary-violet-600",
  inputBoxShadow: "",
  inputIconTextColor: "text-white",

  // Input:Size
  inputIconFontSize: "text-sm",
  inputPaddingV: "",
  inputPaddingH: "",
  inputHeight: "h-5",
  inputWidth: "w-5",
  inputFocusBorderWidth: "focus:border-2",
  inputTextAlign: "text-left",
  inputBorderRadius: "rounded-2xl",
  disabled: {
    inputBorderColor: "border-primary-gray-500",
    inputBackgroundColor: "bg-primary-gray-800",
    inputHoverBorderColor: "hover:border-primary-gray-500",
    inputHoverBackgroundColor: "hover:bg-primary-gray-200",
    inputPlaceHolderTextColor: "",
  },
};

export const RADIO_BUTTON_STYLES = {
  primaryStyle: RADIO_BUTTON_PRIMARY_STYLE,
  secondaryStyle: RADIO_BUTTON_SECONDARY_STYLE,
};

// Checkbox Variants
export const CHECKBOX_PRIMARY_STYLE = {
  ...COMMON_INPUT_STYLE,

  //Input: Color
  inputBorderColor: "border-dark-neutral-gray-300",
  inputHoverBorderColor: "hover:border-dark-neutral-gray-300",
  inputFocusColor: "",
  inputIconTextColor: "",
  inputPlaceHolderTextColor: "",
  inputBackgroundColor: "bg-transparent",
  inputFocusBorderColor: "focus:border-dark-neutral-gray-300",
  inputBoxShadow: "",

  borderStyle: generateBorderStyle({ inputBorderWidth: "border-2" }, { inputBorderDirection: "" }),
  disabled: {
    inputBorderColor: "border-primary-gray-500",
    inputBackgroundColor: "bg-primary-gray-100",
  },
  // Input:Size
  inputIconFontSize: "",
  inputPaddingV: "",
  inputPaddingH: "",
  inputHeight: "h-6",
  inputWidth: "w-6",
  inputTextAlign: "",
  inputBorderRadius: "rounded-lg",
};

export const CHECKBOX_SECONDARY_STYLE = {
  ...COMMON_INPUT_STYLE,

  //Input: Color
  inputBorderColor: "border-primary-gray-200",
  inputHoverBorderColor: "hover:border-primary-gray-100",
  inputFocusColor: "plum-200",
  inputIconTextColor: "text-primary-gray-400",
  inputPlaceHolderTextColor: "placeholder-primary-gray-400",
  inputBackgroundColor: "bg-white",
  inputFocusBorderColor: "focus:border-primary-violet-300",
  inputBoxShadow: "",

  // Input:Size
  inputIconFontSize: "text-sm",
  inputPaddingV: "px-2",
  inputPaddingH: "py-2",
  inputHeight: "h-10",
  inputWidth: "w-100",
  inputFocusBorderWidth: "focus:border-2",
  inputTextAlign: "text-left",
};

export const CHECKBOX_PRIMARY_STYLE_CHECKED = {
  ...COMMON_INPUT_STYLE,

  //Input: Color
  inputBorderColor: "border-2 border-dark-neutral-gray-300",
  inputHoverBorderColor: "hover:border-dark-neutral-gray-300",
  inputFocusColor: "",
  inputHoverBackgroundColor: "hover:bg-dark-neutral-gray-100",
  inputBackgroundColor: "bg-transparent",
  inputFocusBorderColor: "focus:border-primary-violet-600",
  inputBoxShadow: "",

  // Input:Size
  inputIconFontSize: "text-sm font-semibold",
  inputPaddingV: "",
  inputPaddingH: "",
  inputHeight: "h-6",
  inputWidth: "w-6",
  inputFocusBorderWidth: "focus:border-2",
  inputBorderRadius: "rounded-lg",
  inputIconTextColor: "text-dark-neutral-gray-800",
  others: "flex items-center justify-center",
};

export const CHECK_BOX_STYLES = {
  primaryStyle: CHECKBOX_PRIMARY_STYLE,
  secondaryStyle: CHECKBOX_SECONDARY_STYLE,
};

// Toast Variants
export const TOAST_PRIMARY_STYLE = {
  // ...COMMON_INPUT_STYLE,

  inputBorderLeft: "border-l-6",
  inputBorderColor: "border-primary-green-1400",
  //Input: Color
  inputBackgroundColor: "bg-primary-gray-1400",
  inputBorderRadius: "rounded-md",
  inputTextColor: "text-primary-gray-50",
  // Input:Size
  inputFontSize: "text-sm",
  inputHeight: "h-auto",
  inputPadding: "p-3",
  inputMarginBottom: "mb-1.5",
  inputWidth: "w-82.5",
};

export const TOAST_SECONDARY_STYLE = {
  // ...COMMON_INPUT_STYLE,

  inputBorderLeft: "border-l-6",
  inputBorderColor: "border-primary-blue-1400",
  //Input: Color
  inputBackgroundColor: "bg-primary-gray-1400",
  inputBorderRadius: "rounded-md",
  inputTextColor: "text-primary-gray-50",
  // Input:Size
  inputFontSize: "text-sm",
  inputHeight: "h-auto",
  inputPadding: "p-3",
  inputMarginBottom: "mb-1.5",
  inputWidth: "w-82.5",
};

export const TOAST_TERTIARY_STYLE = {
  // ...COMMON_INPUT_STYLE,

  inputBorderLeft: "border-l-6",
  inputBorderColor: "border-primary-yellow-1400",
  //Input: Color
  inputBackgroundColor: "bg-primary-gray-1400",
  inputBorderRadius: "rounded-md",
  inputTextColor: "text-primary-gray-50",
  // Input:Size
  inputFontSize: "text-sm",
  inputHeight: "h-auto",
  inputPadding: "p-3",
  inputMarginBottom: "mb-1.5",
  inputWidth: "w-82.5",
};

export const TOAST_QUATERNARY_STYLE = {
  // ...COMMON_INPUT_STYLE,

  inputBorderLeft: "border-l-6",
  inputBorderColor: "border-primary-red-1000",
  //Input: Color
  inputBackgroundColor: "bg-primary-gray-1400",
  inputBorderRadius: "rounded-md",
  inputTextColor: "text-primary-gray-50",
  // Input:Size
  inputFontSize: "text-sm",
  inputHeight: "h-auto",
  inputPadding: "p-3",
  inputMarginBottom: "mb-1.5",
  inputWidth: "w-82.5",
};

export const TOAST_STYLES = {
  primaryStyle: TOAST_PRIMARY_STYLE,
  secondaryStyle: TOAST_SECONDARY_STYLE,
  tertiaryStyle: TOAST_TERTIARY_STYLE,
  quaternaryStyle: TOAST_QUATERNARY_STYLE,
};

/*
Button Component - ALL STYLE OBJECTS ARE WRITTEN BELOW
*/

//This will be common for all buttons:
export const BUTTON_PRIMARY_SHAPE_SIZE_ALIGNMENT = {
  buttonBorderRadius: "rounded-full",
  buttonFontSize: "text-body-copy-2",
  buttonPaddingV: "px-2",
  buttonPaddingH: "py-4",
  buttonHeight: "h-9",
  buttonWidth: "w-full",
  buttonTextAlign: "text-center",
  borderStyle: generateBorderStyle({ inputBorderWidth: "border" }, { inputBorderDirection: "" }),
};

// PRIMARY BUTTON - All Objects below:
//Severity - BLUE/DEFAULT
export const BUTTON_PRIMARY_COLOR_BLUE = {
  buttonBorderColor: "border-primary-electron-blue-400",
  buttonHoverBorderColor: "hover:border-primary-electron-blue-500",
  buttonActiveBorderColor: "active:primary-electron-blue-400",
  buttonActiveBackgroundColor: "active:bg-primary-electron-blue-400",
  buttonFocusBackgroundColor: "focus:bg-primary-electron-blue-500",
  buttonFocusColor: "focus:outline-none outline-primary-electron-blue-500",
  buttonTextColor: "text-dark-neutral-gray-100",
  buttonBackgroundColor: "bg-primary-electron-blue-400",
  buttonFocusBorderColor: "",
  buttonHoverBackgroundColor: "hover:bg-primary-electron-blue-500",
  buttonHoverTextColor: "text-dark-neutral-gray-1000",
  buttonBoxShadow: "",
  transition: "transition duration-200 ease-in-out",
  disabled: {
    buttonBorderColor: "border-dark-neutral-gray-200",
    buttonBackgroundColor: "bg-dark-neutral-gray-200",
    buttonTextColor: "text-dark-neutral-gray-700",
  },
};

export const BUTTON_PRIMARY_COLOR_TRANSPARENT_BLACK = {
  buttonHoverBorderColor:
    "hover:border-light-oauth-btn-border-hover dark:hover:border-dark-oauth-btn-border-hover",
  buttonActiveBorderColor:
    "active:border-light-oauth-btn-border-hover dark:active:border-dark-oauth-btn-border-hover",
  buttonTextColor: "text-primary-text-main dark:text-dark-text-main",
  buttonFocusBorderColor: "",
  buttonBoxShadow: "",
  buttonBackgroundColor: "bg-primary-oauth-btn",
  buttonBorderColor: "border-light-oauth-btn-border dark:border-dark-oauth-btn-border",
  buttonActiveBackgroundColor: "active:bg-primary-oauth-btn-hover",
  buttonFocusBackgroundColor: "focus:bg-primary-oauth-btn-hover",
  buttonFocusColor: "focus:outline-none outline-light-oauth-btn-border-hover",
  buttonHoverBackgroundColor: "hover:bg-primary-oauth-btn-hover",
};

export const BUTTON_PRIMARY_COLOR_GRADIENT_BLUE = {
  buttonTextColor: "text-primary-text-main dark:text-dark-text-main",
  buttonFocusBorderColor:
    "focus:border-light-oauth-btn-border-hover dark:focus:border-dark-oauth-btn-border-hover",
  buttonBoxShadow: "",
  buttonBackgroundColor: "",
  buttonBorderColor: "border-light-oauth-btn-border dark:border-dark-oauth-btn-border",
  buttonActiveBackgroundColor: "active:bg-primary-oauth-btn-hover",
  buttonFocusBackgroundColor: "focus:bg-primary-oauth-btn-hover",
  buttonFocusColor: "focus:outline-none outline-light-oauth-btn-border-hover",
  buttonHoverBackgroundColor: "",
  buttonHoverBorderColor:
    "hover:border-light-oauth-btn-border-hover dark:hover:border-dark-oauth-btn-border-hover",
};

//Default Primary Button - Blue
export const BUTTON_PRIMARY_BLUE = {
  ...BUTTON_PRIMARY_COLOR_BLUE,
  ...BUTTON_PRIMARY_SHAPE_SIZE_ALIGNMENT,
};

//Primary Button - Red
export const BUTTON_PRIMARY_TRANSPARENT_BLACK = {
  ...BUTTON_PRIMARY_COLOR_TRANSPARENT_BLACK,
  ...BUTTON_PRIMARY_SHAPE_SIZE_ALIGNMENT,
};
export const BUTTON_PRIMARY_GRADIENT_BLUE = {
  ...BUTTON_PRIMARY_COLOR_GRADIENT_BLUE,
  ...BUTTON_PRIMARY_SHAPE_SIZE_ALIGNMENT,
};

//Primary Button
export const BUTTON_PRIMARY = {
  default: BUTTON_PRIMARY_BLUE,
  blue: BUTTON_PRIMARY_BLUE,
  "transparent-black": BUTTON_PRIMARY_TRANSPARENT_BLACK,
  "gradient-blue": BUTTON_PRIMARY_GRADIENT_BLUE,
};

// SECONDARY BUTTON - All Objects below:
export const BUTTON_SECONDARY_STYLE = {};

//Severity - BLUE/DEFAULT
export const BUTTON_SECONDARY_COLOR_BLUE = {
  buttonBorderColor: "border-primary-electron-blue-400",
  buttonHoverBorderColor: "hover:border-primary-electron-blue-500",
  buttonActiveBorderColor: "active:border-primary-electron-blue-500",
  buttonFocusColor: "focus:outline-none outline-primary-electron-blue-500",
  buttonTextColor: "text-dark-neutral-gray-1000",
  buttonFocusBorderColor: "",
  buttonHoverBackgroundColor: "hover:bg-primary-electron-blue-200",
  transition: "transition duration-200 ease-in-out",
  disabled: {
    buttonBorderColor: "border-dark-neutral-gray-200",
    buttonTextColor: "text-dark-neutral-gray-700",
    buttonBackgroundColor: "bg-dark-neutral-gray-100",
  },
};

//Secondary Button - Blue
export const BUTTON_SECONDARY_BLUE = {
  ...BUTTON_SECONDARY_COLOR_BLUE,
  ...BUTTON_PRIMARY_SHAPE_SIZE_ALIGNMENT,
};

export const BUTTON_SECONDARY = {
  default: BUTTON_SECONDARY_BLUE,
  blue: BUTTON_SECONDARY_BLUE,
};
export const BUTTON_ICON_SHAPE_SIZE_ALIGNMENT = {
  buttonBorderRadius: "rounded-full",
  buttonFontSize: "text-body-copy-2",
  buttonPaddingV: "",
  buttonPaddingH: "",
  buttonHeight: "h-9",
  buttonWidth: "w-10",
  buttonTextAlign: "text-center",
  iconAlign: "flex items-center justify-center",
  borderStyle: generateBorderStyle({ inputBorderWidth: "border" }, { inputBorderDirection: "" }),
};

// ICON BUTTON - All Objects below:

//Severity - GRADIENT BLUE
export const BUTTON_ICON_PRIMARY_COLOR_GRADIENT_BLUE = {
  ...BUTTON_PRIMARY_COLOR_GRADIENT_BLUE,
};

const BUTTON_ICON_GRADIENT_BLUE = {
  ...BUTTON_ICON_PRIMARY_COLOR_GRADIENT_BLUE,
  ...BUTTON_ICON_SHAPE_SIZE_ALIGNMENT,
};

export const BUTTON_ICON_PRIMARY_COLOR_BLUE = {
  ...BUTTON_PRIMARY_COLOR_GRADIENT_BLUE,
};

const BUTTON_ICON_BLUE = {
  ...BUTTON_PRIMARY_COLOR_BLUE,
  ...BUTTON_ICON_SHAPE_SIZE_ALIGNMENT,
};

export const BUTTON_ICON = {
  default: BUTTON_ICON_GRADIENT_BLUE,
  "gradient-blue": BUTTON_ICON_GRADIENT_BLUE,
  blue: BUTTON_ICON_BLUE,
};

// NO_BORDER BUTTON - All Objects below:
const BUTTON_NO_BORDER_SHAPE_SIZE_ALIGNMENT = {
  buttonBorderRadius: "rounded-full",
  buttonFontSize: "text-body-copy-2",
  buttonPaddingV: "px-2",
  buttonPaddingH: "py-4",
  buttonHeight: "h-9",
  buttonWidth: "w-full",
  buttonTextAlign: "text-center",
  transition: "transition duration-200 ease-in-out",
};

export const BUTTON_NO_BORDER_COLOR_WHITE = {
  // buttonHoverBorderColor: "hover:border-dark-neutral-gray-200",
  // buttonActiveBorderColor: "active:border-dark-neutral-gray-200",
  buttonFocusColor: "focus:outline-none outline-dark-neutral-gray-700",
  buttonFocusTextColor: "focus:text-dark-neutral-gray-600",
  buttonActiveTextColor: "active:text-dark-neutral-gray-1000",
  buttonHoverTextColor: "hover:text-dark-neutral-gray-800",
  buttonTextColor: "text-dark-neutral-gray-900",
  buttonFocusBorderColor: "",
  buttonTextDecoration: "underline",
  // buttonHoverBackgroundColor: "hover:bg-dark-neutral-gray-200",
  buttonBoxShadow: "",
  buttonBorderRadius: "rounded-lg",
  buttonBackgroundColor: "bg-transparent",
  buttonBorderWidth: "border-0",
  buttonPaddingV: "px-2",
  buttonPaddingH: "py-4",
  buttonTextAlign: "text-center",
  others: "hover:underline",
  disabledStyle: {
    buttonTextColor: "text-dark-neutral-gray-400",
  },
};

const BUTTON_NO_BORDER_WHITE = {
  ...BUTTON_NO_BORDER_COLOR_WHITE,
  ...BUTTON_NO_BORDER_SHAPE_SIZE_ALIGNMENT,
};

export const BUTTON_NO_BORDER = {
  default: BUTTON_NO_BORDER_WHITE,
  white: BUTTON_NO_BORDER_WHITE,
};

export const BUTTON_BOX_STYLES = {
  primary: BUTTON_PRIMARY,
  secondary: BUTTON_SECONDARY,
  icon: BUTTON_ICON,
  "no-border": BUTTON_NO_BORDER,
};

export const COMMON_MESSAGE_STYLE = {
  //Input: Color
  messageBorderColor: "border-primary-plum-700",
  messageHoverBorderColor: "hover:border-primary-gray-800",
  messageBackgroundColor: "bg-white",
  messageHoverBackgroundColor: "hover:bg-white",
  messageBoxShadow: "",
  messageBorderRadius: "rounded-lg",
  borderStyle: generateBorderStyle(
    { inputBorderWidth: "border-2" },
    { inputBorderDirection: "-b" }
  ),
  messageMarginRight: "!mr-2",
  messageMarginLeft: "!ml-2",
  messageMarginTop: "!mt-2",
  messageMarginBottom: "!mb-2",
  messagePaddingV: "px-2",
  messagePaddingH: "py-4",
  messageHeight: "h-10",
  messageWidth: "w-27",
};

export const DIALOG_PRIMARY_STYLE = {
  ...COMMON_MESSAGE_STYLE,
  //Input: Color
  messageBorderColor: "border-primary-plum-700",
  messageHoverBorderColor: "hover:border-primary-gray-800",
  messageBackgroundColor: "bg-white",
  messageHoverBackgroundColor: "hover:bg-white",
  messageBoxShadow: "",
  messageBorderRadius: "rounded-lg",

  messageMarginRight: "!mr-2",
  messageMarginLeft: "!ml-2",
  messageMarginTop: "!mt-2",
  messageMarginBottom: "!mb-2",
  messagePaddingV: "px-2",
  messagePaddingH: "py-4",
  messageHeight: "h-100",
  messageWidth: "w-100",
};

export const DIALOG_SECONDARY_STYLE = {
  ...COMMON_MESSAGE_STYLE,
  //Input: Color
  messageBorderColor: "border-primary-plum-700",
  messageHoverBorderColor: "hover:border-primary-gray-800",
  messageBackgroundColor: "bg-white",
  messageHoverBackgroundColor: "hover:bg-white",
  messageBoxShadow: "",
  messageBorderRadius: "rounded-lg",

  messageMarginRight: "!mr-2",
  messageMarginLeft: "!ml-2",
  messageMarginTop: "!mt-2",
  messageMarginBottom: "!mb-2",
  messagePaddingV: "px-2",
  messagePaddingH: "py-4",
  messageHeight: "h-10",
  messageWidth: "w-27",
};

export const DIALOG_BOX_STYLES = {
  primaryStyle: DIALOG_PRIMARY_STYLE,
  secondaryStyle: DIALOG_SECONDARY_STYLE,
};
