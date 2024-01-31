import { RADIO_BUTTON_PRIMARY_STYLE_CHECKED, RADIO_BUTTON_STYLES } from "asset/base-theme";
import BaseRadioButton, { IBaseRadioButtonProps } from "component/base/BaseRadioButton";
import { IInputCommonStyleProps } from "component/interface/Input";
import React from "react";
import { generateClasses } from "util/Util";

interface IRadioButtonProps extends IBaseRadioButtonProps, IInputCommonStyleProps {}

const RadioButtonWithoutMemo: React.FC<IRadioButtonProps> = (props: IRadioButtonProps) => {
  const { variant, styleObj, ...BaseRadioButtonProps } = props;
  const getClassNames = () => {
    let styleObject = {
      ...RADIO_BUTTON_STYLES,
      overrideStyle: styleObj,
      overrideClasses: props.className,
      isDisabled: props.disabled,
      removeStyleProperty: [],
      removeClasses: [],
    };

    if (props.checked) {
      styleObject = { ...styleObject, primaryStyle: RADIO_BUTTON_PRIMARY_STYLE_CHECKED };
      return generateClasses(styleObject, "PRIMARY");
    } else {
      return generateClasses(styleObject, variant);
    }
  };

  return (
    <>
      <BaseRadioButton {...BaseRadioButtonProps} className={getClassNames()} />
    </>
  );
};

// memoization

const RadioButton = React.memo(RadioButtonWithoutMemo);
// redux wiring

// exports
export default RadioButton;
