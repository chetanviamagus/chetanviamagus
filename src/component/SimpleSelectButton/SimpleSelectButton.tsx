import { SelectButton, SelectButtonChangeParams, SelectButtonProps } from "primereact/selectbutton";
import React, { useState } from "react";

interface CustomSelectButtonProps extends SelectButtonProps {
  onChange: (value: any) => void;
}

const SimpleSelectButton: React.FC<CustomSelectButtonProps> = (props: CustomSelectButtonProps) => {
  const { options, optionLabel, onChange, className, multiple, ...primeReactProps } = props;
  const [selectedOption, setSelectedOption] = useState<any | null>(
    (options && options[0].value) || null
  );

  const handleSelectionChange = (e: SelectButtonChangeParams) => {
    if (e.value !== null) {
      setSelectedOption(e.value);
      onChange(e.value);
    }
  };

  return (
    <SelectButton
      className={`selectButton flex h-9 items-center rounded-md bg-dark-neutral-gray-200 p-0.5 text-sm leading-none text-dark-neutral-gray-700 hover:text-dark-neutral-gray-900 ${
        className ?? ""
      }`}
      optionLabel={optionLabel ?? "name"}
      value={selectedOption}
      options={options}
      onChange={handleSelectionChange}
      multiple={multiple ?? false}
      {...primeReactProps}
    />
  );
};

export default SimpleSelectButton;
