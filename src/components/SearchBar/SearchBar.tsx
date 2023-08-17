import React, { ChangeEvent, FC, useEffect, useState } from "react";

interface SearchBarProps {
  setSearchTerm: (searchTerm: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ setSearchTerm }) => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 1000);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <div className="searchbar__container">
      <form action="" className="searchbar__form">
        <input
          type="text"
          className="searchbar__input"
          value={searchInput}
          onChange={handleChange}
          placeholder="Search ..."
        />
      </form>
    </div>
  );
};

export default SearchBar;
