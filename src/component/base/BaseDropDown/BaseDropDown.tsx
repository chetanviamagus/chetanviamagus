import { Dropdown, DropdownProps } from "primereact/dropdown";
import React from "react";
import Label from "component/Label";
import { IBaseInputCommonProps } from "component/interface/Input";
import InputError from "component/InputError";

export interface IBaseDropDownProps extends DropdownProps, IBaseInputCommonProps {}

const BaseDropDown: React.FC<IBaseDropDownProps> = (props: IBaseDropDownProps) => {
  const {
    hideLabel,
    label,
    validation,
    labelClassNames,
    hideErrorRow,
    errorClassNames,
    ...PrimeReactProps
  } = props;

  const {
    placeholder,
    className,
    value,
    panelClassName,
    disabled,
    inputId,
    optionLabel,
    options,
    optionValue,
    onChange,
  } = PrimeReactProps;

  return (
    <>
      {!hideLabel && (
        <div className="flex flex-row">
          <Label label={label} labelClassNames={labelClassNames} />
          <Label label="*" labelClassNames="text-red-500" />
        </div>
      )}
      <Dropdown
        // appendTo={}
        className={className}
        disabled={disabled}
        inputId={inputId ? inputId : ""}
        optionLabel={optionLabel}
        options={options}
        optionValue={optionValue}
        panelClassName={panelClassName}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...PrimeReactProps}
      />
      {!hideErrorRow && (
        <InputError
          validation={validation}
          hideErrorRow={hideErrorRow}
          errorClassNames={errorClassNames}
        />
      )}
    </>
  );
};

export default BaseDropDown;
