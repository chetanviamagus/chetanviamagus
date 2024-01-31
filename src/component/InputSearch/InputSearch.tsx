import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import InputBox from "component/InputBox/InputBox";
import { useState } from "react";

interface InputSearchProps {
  handleSearch: (value: string) => void;
  placeholder?: string;
}

const InputSearch: React.FC<InputSearchProps> = (props: InputSearchProps) => {
  const { handleSearch, placeholder } = props;

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="relative mx-auto w-full">
      <div className="absolute bottom-2 left-3">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </div>

      <InputBox
        value={inputValue}
        onChange={handleInputChange}
        className="!h-9 w-full !rounded-md !px-11"
        placeholder={placeholder ?? "Filter"}
        hideLabel
        hideErrorRow
      />
    </div>
  );
};

export default InputSearch;
