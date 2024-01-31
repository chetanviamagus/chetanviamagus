import React, { useEffect } from "react";
import StaticDataService from "../../service/StaticDataService";
import BaseInputPhone from "component/base/BaseInputPhone";
import { CountryInfo } from "interface/common";

const InputPhone = (props: any) => {
  const [countryCodeList, setCountryCodeList] = React.useState([]);
  const [isTyping, setIsTyping] = React.useState(false);

  useEffect(() => {
    getCodesIntoArray();
  }, []);

  const getCodesIntoArray = async () => {
    StaticDataService.getCountryCodeDetails()
      .then((res: any) => {
        if (res?.data?.length > 0) {
          setCountryCodeList(res.data);
        }
      })
      .catch((err) => {
        setCountryCodeList([]);
      });
  };

  const getDropdownClassNames = (): string => {
    return `mb-2 pr-2 text-base ${isTyping ? "border-gray-300" : "border-gray-800"}`;
  };

  const getPanelClassNames = (): string => {
    return "border p-2 rounded-lg bg-white";
  };

  const countryOptionTemplate = (option: CountryInfo) => {
    return (
      <div className="flex items-center justify-around mb-2 text-sm">
        <div className="w-6 ml-4">
          <img alt={option.countryName} src={option.flag} />
        </div>
        <div className="ml-2 flex-1 flex items-center justify-between">
          <div>{option.countryName}</div>
          <div className="mr-4">{option.code}</div>
        </div>
      </div>
    );
  };

  const selectedCountryTemplate = (option: CountryInfo, props: any) => {
    // console.log(">>> option:", option);
    if (option) {
      return (
        <div className="flex text-base items-center ">
          <div className="w-6">
            <img alt={option.countryName} className="w-full" src={option.flag} />
          </div>
          <div className=" mx-2 flex-1 flex items-center opacity-50 justify-between">
            <div className="">{option.code}</div>
          </div>
        </div>
      );
    }

    return <span>{props.countryCodePlaceholder}</span>;
  };

  const {
    inputId,
    disabled,
    onBlur,
    validation,
    countryCodeValue,
    onCountryCodeChange,
    phoneNumberValue,
    onPhoneNumberChange,
    disableCountryCode,
  } = props;

  return (
    <>
      <BaseInputPhone
        inputId={inputId}
        disabled={disabled}
        onBlur={onBlur}
        validation={validation}
        countryCodeValue={countryCodeValue || "+91"}
        onCountryCodeChange={onCountryCodeChange}
        phoneNumberValue={phoneNumberValue}
        onPhoneNumberChange={onPhoneNumberChange}
        disableCountryCode={disableCountryCode}
        // Added
        dropdownClassName={getDropdownClassNames()}
        panelClassName={getPanelClassNames()}
        countryCodeList={countryCodeList}
        onUserTyping={setIsTyping}
        //Template
        countryOptionTemplate={countryOptionTemplate}
        selectedCountryTemplate={selectedCountryTemplate}
        {...props}
      />
    </>
  );
};

export default InputPhone;
