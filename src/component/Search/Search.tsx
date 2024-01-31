import { IconX } from "@tabler/icons-react";
import InputBox from "component/InputBox/InputBox";
import { FC } from "react";

import { useTranslation } from "react-i18next";

interface Props {
  placeholder: string;
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}
const Search: FC<Props> = ({ placeholder, searchTerm, onSearch }) => {
  const { t } = useTranslation("sidebar");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    onSearch("");
  };

  return (
    <div className="relative flex w-full items-center">
      <InputBox
        hideLabel
        hideErrorRow
        placeholder={t(placeholder) || ""}
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full !rounded-md"
      />

      {searchTerm && (
        <IconX
          className="absolute right-4 cursor-pointer text-neutral-300 hover:text-neutral-400"
          size={18}
          onClick={clearSearch}
        />
      )}
    </div>
  );
};

export default Search;
