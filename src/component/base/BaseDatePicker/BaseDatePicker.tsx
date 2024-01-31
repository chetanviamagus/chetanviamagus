import InputError from "component/InputError";
import Label from "component/Label";
import { IBaseInputCommonProps } from "component/interface/Input";
import { Calendar, CalendarProps } from "primereact/calendar";
import React from "react";

export interface IBaseDatePickerProps extends CalendarProps, IBaseInputCommonProps {}
const BaseDatePicker: React.FC<IBaseDatePickerProps> = (props: IBaseDatePickerProps) => {
  const {
    hideLabel,
    label,
    labelClassNames,
    labelStyleObj,
    validation,
    hideErrorRow,
    errorClassNames,
    errorStyleObj,
    ...PrimeReactProps
  } = props;

  const { className, panelClassName, inputClassName, value, name } = PrimeReactProps;

  return (
    <React.Fragment>
      {!hideLabel && <Label label={label} labelClassNames={labelClassNames} />}
      <Calendar
        yearRange="1900:2030"
        monthNavigator={true}
        yearNavigator={true}
        selectOtherMonths={false}
        showIcon={true}
        panelClassName={panelClassName}
        className={className}
        inputClassName={inputClassName}
        name={name}
        value={value}
        {...PrimeReactProps}
      />
      {!hideErrorRow && (
        <InputError
          validation={validation}
          hideErrorRow={hideErrorRow}
          errorClassNames={errorClassNames}
        />
      )}
    </React.Fragment>
  );
};

export default BaseDatePicker;
