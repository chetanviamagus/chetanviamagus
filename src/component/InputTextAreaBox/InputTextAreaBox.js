import { InputTextarea } from "primereact/inputtextarea";
import PropTypes from "prop-types";
import React, { Component } from "react";
import InputError from "../InputError";
import Label from "../Label";
class InputTextAreaBox extends Component {
  getClassNames = () => {
    let className =
      " w-full transition duration-150 ease-out border border-inputBorderColour bg-white " +
      " focus:border-inputBorderColour focus:shadow-selected-shadow outline-none " +
      " placeholder-inputPlaceHolderTextColour text-left text-inputFontSize text-inputTextColour " +
      " rounded-inputBorderRadius px-inputPaddingH py-inputPaddingV leading-none ";
    if (this.props.disabled) {
      className =
        " w-full transition duration-150 ease-out border-0 " +
        " focus:border-inputBorderColour focus:shadow-selected-shadow outline-none bg-inputDisabledColour " +
        " placeholder-inputPlaceHolderTextColour text-left text-inputFontSize text-inputTextColour " +
        " rounded-inputBorderRadius px-inputPaddingH py-inputPaddingV leading-none ";
    }
    if (className) {
      className = className + " " + className;
    }
    return className;
  };
  getCount = () => {
    let value = value;
    let maxCount = maxCount;
    let currentCount = 0;
    if (maxCount && value) {
      currentCount = value.length;
    }
    return currentCount;
  };
  render() {
    let className = this.getClassNames();
    let currentCount = this.getCount();
    const {
      label,
      hideLabel,
      disableBottomMargin,
      value,
      disabled,
      maxCount,
      onChange,
      onBlur,
      validation,
      rows,
      hideErrorRow,
    } = this.props;
    return (
      <>
        <Label label={label} hideLabel={hideLabel} disableBottomMargin={disableBottomMargin} />
        <InputTextarea
          {...this.props}
          rows={rows ? rows : 2}
          className={className}
          disabled={disabled}
          value={value}
          onChange={(e) => {
            if (e && e.target && e.target.value) {
              let val = e.target.value;
              if (val.length > maxCount) {
                e.target.value = val.substring(0, maxCount);
              }
            }
            if (onChange) {
              onChange(e);
            }
          }}
          onBlur={onBlur}
        />
        {maxCount ? (
          <div className="flex w-full items-center justify-between">
            <InputError hideErrorRow={hideErrorRow} validation={validation} />
            <div className="text-inputLabelColour text-right text-xs font-medium">
              {currentCount} / {maxCount}
            </div>
          </div>
        ) : (
          <InputError hideErrorRow={hideErrorRow} validation={validation} />
        )}
      </>
    );
  }
}
InputTextAreaBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  maxCount: PropTypes.number,
  onBlur: PropTypes.func,
  label: PropTypes.string,
  hideLabel: PropTypes.string,
  hideErrorRow: PropTypes.bool,
  disableBottomMargin: PropTypes.bool,
  disabled: PropTypes.bool,
  validation: PropTypes.bool,
};
export default InputTextAreaBox;
