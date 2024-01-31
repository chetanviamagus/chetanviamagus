import { BASE_PANEL_STYLE, DROP_DOWN_STYLES } from "asset/base-theme";
import BaseDropDown, { IBaseDropDownProps } from "component/base/BaseDropDown";
import { IInputCommonStyleProps } from "component/interface/Input";
import React from "react";
import { generateClasses } from "util/Util";

interface IDropDownProps extends IBaseDropDownProps, IInputCommonStyleProps {
  panelStyleObj?: object;
}
const SimpleDropDownWithoutMemo: React.FC<IDropDownProps> = (props: IDropDownProps) => {
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
      ...DROP_DOWN_STYLES,
      overrideStyle: props.styleObj,
      overrideClasses: props.className,
      isDisabled: props.disabled,
      isInvalid: props.validation ? true : false,
      removeStyleProperty: [],
      removeClasses: [],
    };

    const classNamesObject = generateClasses(styleObject, props.variant);
    const panelStyleObject: StyleObjectInterface = {
      primaryStyle: BASE_PANEL_STYLE,
      disabledStyleProperty: [
        "inputDisabledBackgroundColor",
        "inputDisabledBorderColor",
        "inputDisabledTextColor",
        "inputDisabledBorderSize",
      ], // Property name for disable classes
      overrideStyle: props.panelStyleObj,
      removeStyleProperty: [],
      removeClasses: [],
    };

    const panelClassNamesObject = generateClasses(panelStyleObject, props.variant);

    return [classNamesObject, panelClassNamesObject];
  };

  const getClassNameValues = getClassNames();
  const classNames = getClassNameValues[0];
  const panelClassNames = getClassNameValues[1];

  const { value, onChange, name, placeholder, label, options } = props;
  return (
    <BaseDropDown
      {...props}
      className={classNames}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      label={label}
      options={options}
      panelClassName={panelClassNames}
    />
  );
};

// Memoization

const SimpleDropDown = React.memo(SimpleDropDownWithoutMemo);
// redux wiring

// exports
export default SimpleDropDown;
