import { useRef } from "react";
import searchIcon from "../../assets/icon/searchIcon.svg";

export const SearchInput = () => {
  const inputRef = useRef();

  const handleInputChange = () => {
    console.log(inputRef.current.value);
  };

  return (
    <label className=" flex items-center text-right mt-4 text-white relative">
      <input
        type="text"
        className="input w-9/12 h-14 p-4 bg-custom-gray block m-auto mt-1 rounded-md text-right outline-none border"
        placeholder="بحث"
        ref={inputRef}
        onChange={handleInputChange}
      />
      <img
        src={searchIcon}
        className="absolute lg:left-72 md:left-32 sm:left-28 xs:left-20"
        alt="search icon"
      />
    </label>
  );
};
