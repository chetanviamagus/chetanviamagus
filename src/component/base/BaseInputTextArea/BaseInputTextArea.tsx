import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";
import React from "react";
import { IBaseInputCommonProps } from "component/interface/Input";
import Label from "component/Label";
import InputError from "component/InputError";

export interface IBaseInputTextAreaProps extends InputTextareaProps, IBaseInputCommonProps {
  maxCount?: number;
}
const BaseInputTextArea: React.FC<IBaseInputTextAreaProps> = (props: IBaseInputTextAreaProps) => {
  const {
    maxCount,
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

  const { placeholder, className, value, name, onChange, rows } = PrimeReactProps;

  function getCount() {
    let currentCount = 0;
    if (maxCount && value) {
      currentCount = value.toString().length;
    }
    return currentCount;
  }

  function handleCount(e: any) {
    if (e && e.target && e.target.value) {
      const val = e.target.value;
      if ((maxCount ?? -1) >= 0 && val.length > (maxCount ?? -1)) {
        e.target.value = val.substring(0, maxCount);
      }
    }
    if (onChange) {
      onChange(e);
    }
  }

  const currentCount = getCount();
  return (
    <div className="flex flex-col">
      {!hideLabel && (
        <div className="flex flex-row">
          <Label
            label={label}
            labelClassNames={labelClassNames}
            labelStyleObj={labelStyleObj}
            isInvalid={validation}
          />
          {/* <Label label="*" labelClassNames="text-red-500" /> */}
        </div>
      )}
      <InputTextarea
        {...PrimeReactProps}
        className={className}
        value={value}
        onChange={handleCount}
        name={name}
        placeholder={placeholder}
        rows={rows}
      />
      {maxCount ? (
        <div>
          <div className="text-right text-xs">
            {currentCount} / {maxCount}
          </div>
        </div>
      ) : (
        <></>
      )}
      <InputError validation={validation} hideErrorRow={hideErrorRow} errorClassNames="" />
    </div>
  );
};

export default BaseInputTextArea;
