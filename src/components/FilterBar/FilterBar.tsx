import React, { FC, useEffect, useState } from "react";
import { UserData } from "../userData";

interface FilterBarProps {
  filter: UserData[];
  // onFilterChange: (userData: UserData[]) => void;
}

const FilterBar: FC<FilterBarProps> = ({ filter }) => {
  const [uniqueCountries, setUniqueCountries] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  console.log(filter);

  useEffect(() => {
    const uniqueCountriesSet = new Set(
      filter.map((user) => user.location.country)
    );
    const uniqueCountriesArray = Array.from(uniqueCountriesSet);
    setUniqueCountries(uniqueCountriesArray);
  }, [filter]);

  const applyFilters = () => {
    const filteredData = filter.filter((user) => {
      const matchesGender = selectedGender
        ? user.gender === selectedGender
        : true;
      const matchesCountry = selectedCountry
        ? user.location.country === selectedCountry
        : true;
      return matchesGender && matchesCountry;
    });

    console.log(filteredData);

    setShowPopup(false);
  };

  return (
    <div className="filterbar__container">
      {showPopup && (
        <>
          <div className="filter__popup">
            <div className="filter__categories">
              <div className="gender__filter">
                <label htmlFor="gender">By Gender</label>
                <select
                  name="gender"
                  id="gender"
                  onChange={(e) => setSelectedGender(e.target.value || null)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="country__filter">
                <label htmlFor="country">By Country</label>
                <select
                  name="country"
                  id="country"
                  onChange={(e) => setSelectedCountry(e.target.value || null)}
                >
                  {uniqueCountries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="filter__buttons">
              <button
                className="filter__cancel"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button className="filter__apply" onClick={applyFilters}>
                Apply
              </button>
            </div>
          </div>
          <div className="overlay" onClick={() => setShowPopup(false)}></div>
        </>
      )}

      <button className="filter__btn" onClick={() => setShowPopup(!showPopup)}>
        <img
          src="assets/svg/filter.svg"
          alt="filter button"
          className="filter__icon"
        />
        <p>Filter</p>
      </button>
      <div className="filter__results">
        <span>Showing</span> 189 <span>from</span> 1000 <span>results</span>
      </div>
    </div>
  );
};

export default FilterBar;
