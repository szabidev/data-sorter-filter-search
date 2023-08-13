import React, { FC } from "react";

interface HeaderProps {
  setData: (data: any) => void;
  setSearchTerm: (keyword: string) => void;
}

const Header: FC<HeaderProps> = ({ setData, setSearchTerm }) => {
  const fetchData = () => {
    const BASE_URL = "https://randomuser.me/api/?results=1000";

    fetch(BASE_URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data.results);
        console.log(data);
      });

    setSearchTerm("");
  };

  return (
    <div className="header__container">
      <div className="header">
        <div className="header__content">
          <p className="header__title">Random User Data Sorter</p>
          <div className="header__buttons">
            <img
              src="/assets/svg/refresh.svg"
              alt="refresh button"
              onClick={fetchData}
            />
            <img src="/assets/svg/settings.svg" alt="settings button" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
