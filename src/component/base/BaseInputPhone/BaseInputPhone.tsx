import React from "react";
import { Dropdown } from "primereact/dropdown";

import InputBox from "component/InputBox";
// import SimpleDropDown from "component/SimpleDropDown/SimpleDropDown";

const InputPhone = (props: any) => {
  const { onUserTyping } = props;

  const handleOnBlur = (e: any) => {
    onUserTyping && onUserTyping(false);
    onBlur && onBlur(e);
  };

  const handleOnFocus = (e: any) => {
    onUserTyping && onUserTyping(true);
    onFocus && onFocus(e);
  };

  const handleOnPhoneNumberChange = (e: any) => {
    onPhoneNumberChange && onPhoneNumberChange(e);
    onUserTyping && onUserTyping(true);
  };

  const {
    selectedCountryTemplate,
    dropdownClassName,
    panelClassName,
    countryCodeList,
    countryCodeValue,
    onCountryCodeChange,
    disableCountryCode,
    countryOptionTemplate,
    countryCodeName,
    ...inputBoxProps
  } = props;

  const {
    phoneNumberValue,
    onPhoneNumberChange,
    inputId,
    disabled,
    onBlur,
    onFocus,
    validation,
    phoneNumberName,
    ...dropDownProps
  } = props;

  return (
    <>
      <div className="flex items-center w-full justify-center ">
        <div className="">
          <Dropdown
            className={dropdownClassName}
            disabled={disableCountryCode}
            inputId={inputId ? inputId : ""}
            options={countryCodeList}
            optionLabel="countryName"
            optionValue="code"
            panelClassName={panelClassName}
            scrollHeight="200px"
            value={countryCodeValue}
            {...dropDownProps}
            onChange={onCountryCodeChange}
            itemTemplate={countryOptionTemplate}
            valueTemplate={selectedCountryTemplate}
            name={countryCodeName || "countryCode"}
          />
        </div>
        <div className="w-full flex items-center ">
          <InputBox
            {...inputBoxProps}
            value={phoneNumberValue}
            type="tel"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            size="20"
            minLength="9"
            maxLength="14"
            onChange={handleOnPhoneNumberChange}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            disabled={disabled}
            validation={validation ? validation : ""}
            name={phoneNumberName || "phoneNumber"}
          />
        </div>
      </div>
    </>
  );
};

export default InputPhone;
