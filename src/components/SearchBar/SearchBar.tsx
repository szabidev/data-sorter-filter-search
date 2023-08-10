import React, { ChangeEvent, FC, useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      onSearch(e.target.value);
    }, 1000);
    setSearchTerm(e.target.value);
  };

  return (
    <div className="searchbar__container">
      <form action="" className="searchbar__form">
        <input
          type="text"
          className="searchbar__input"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search ..."
        />
      </form>
    </div>
  );
};

export default SearchBar;
