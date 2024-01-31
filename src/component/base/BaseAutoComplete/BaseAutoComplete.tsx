import InputError from "component/InputError";
import Label from "component/Label";
import { IBaseInputCommonProps } from "component/interface/Input";
import { AutoComplete, AutoCompleteProps } from "primereact/autocomplete";
import React, { useEffect, useRef } from "react";

export interface IBaseAutoCompleteProps extends AutoCompleteProps, IBaseInputCommonProps {
  showPanel?: true;
}

const BaseAutoComplete: React.FC<IBaseAutoCompleteProps> = (props: any) => {
  const {
    hideLabel,
    hideErrorRow,
    label,
    validation,
    labelClassNames,
    errorClassNames,
    showPanel,
    ...PrimeReactProps
  } = props;

  const { placeholder, className, value, style, name, onChange } = PrimeReactProps;

  //Refs
  const autoCompleteRef: any = useRef();

  //Initial start
  useEffect(() => {
    if (showPanel === true) {
      autoCompleteRef?.current?.showOverlay();
    }
  }, [props]);

  return (
    <div>
      {!hideLabel && <Label label={label} labelClassNames={labelClassNames} />}

      <AutoComplete
        appendTo="self"
        {...props}
        className=""
        inputClassName={className}
        value={value}
        style={style}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        ref={autoCompleteRef}
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

export default BaseAutoComplete;
