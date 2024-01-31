import { AUTOCOMPLETE_STYLES, PANEL_PRIMARY_STYLE } from "asset/base-theme";
import BaseAutoComplete, { IBaseAutoCompleteProps } from "component/base/BaseAutoComplete";
import { IInputCommonStyleProps } from "component/interface/Input";
import React from "react";
import { INPUT_ERROR_TYPE } from "util/Constant";
import { generateClasses } from "util/Util";

interface IAutoCompleteBoxProps extends IBaseAutoCompleteProps, IInputCommonStyleProps {
  panelStyleObj?: object;
}

const AutoCompleteWithoutMemo: React.FC<IAutoCompleteBoxProps> = (props: IAutoCompleteBoxProps) => {
  const getClassNames = () => {
    interface STYLE_OBJECT {
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
      applyErrorStyle?: boolean | string;
      [key: string]: any; // additional property Allowed (for ternaryStyle or Other)
    }
    const styleObject: STYLE_OBJECT = {
      ...AUTOCOMPLETE_STYLES,
      overrideStyle: props.styleObj,
      overrideClasses: props.className,
      isDisabled: props.disabled,
      applyErrorStyle: props.validation && props.errorType == INPUT_ERROR_TYPE.BORDER,
      removeStyleProperty: [],
      removeClasses: [],
    };

    const classNamesObject = generateClasses(styleObject, props.variant);

    const panelStyleObject: STYLE_OBJECT = {
      primaryStyle: PANEL_PRIMARY_STYLE,
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

  const { value, onChange, name, placeholder, label, validation, onSelect, showPanel } = props;

  return (
    <>
      <BaseAutoComplete
        {...props}
        className={classNames}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        label={label}
        validation={validation}
        panelClassName={panelClassNames}
        onSelect={onSelect}
        showPanel={showPanel}
      />
    </>
  );
};

// memoization

const AutoComplete = React.memo(AutoCompleteWithoutMemo);
// redux wiring

// exports
export default AutoComplete;
