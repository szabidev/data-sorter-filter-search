import React, { FC } from "react";
import { UserData } from "../userData";

interface HeaderProps {
  data: UserData[];
  setDataToDisplay: (data: UserData[]) => void;
  setSearchTerm: (keyword: string) => void;
}

const Header: FC<HeaderProps> = ({ data, setDataToDisplay, setSearchTerm }) => {
  const resetData = () => {
    setDataToDisplay(data);
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
              onClick={resetData}
            />
            <img src="/assets/svg/settings.svg" alt="settings button" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
