import React, { useEffect, useState } from "react";
import Header from "../Header";
import TableContainer from "../Table/TableContainer";
import { UserData } from "../userData";
import SearchBar from "../SearchBar";
import FilterBar from "../FilterBar";

const DataView = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<
    "first" | "last" | "age" | "none"
  >("none");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<UserData[]>([]);

  const BASE_URL = "https://randomuser.me/api/?results=1000";
  const columnLabels = [
    { key: "picture.thumbnail", label: "Picture" },
    { key: "name.first", label: "First Name" },
    { key: "name.last", label: "Last Name" },
    { key: "gender", label: "Gender" },
    { key: "dob", label: "Date of Birth" },
    { key: "dob.age", label: "Age" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "location.country", label: "Country" },
    { key: "nat", label: "Nationality" },
  ];

  const searchData = data.filter((user) => {
    const userFirstName = user.name.first.toLowerCase();
    const userLastName = user.name.last.toLowerCase();
    const userEmail = user.email.toLowerCase();

    const firstNameMatch = userFirstName.includes(searchTerm.toLowerCase());
    const lastNameMatch = userLastName.includes(searchTerm.toLowerCase());
    const emailMatch = userEmail.includes(searchTerm.toLowerCase());

    return firstNameMatch || lastNameMatch || emailMatch;
  });

  const displayedData = searchTerm === "" ? data : searchData;

  const handleSearch = (keyword: string) => {
    setSearchTerm(keyword);
  };

  // const applyFilters = (gender: string | null, country: string | null) => {
  //   setSelectedGender(gender);
  //   setSelectedCountry(country);
  // };

  const handleSort = (column: "first" | "last" | "age") => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedData = [...displayedData];
  if (sortColumn !== "none") {
    sortedData.sort((a, b) => {
      const aValue = sortColumn === "age" ? a.dob.age : a.name[sortColumn];
      const bValue = sortColumn === "age" ? b.dob.age : b.name[sortColumn];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data.results);
      });
  }, []);

  useEffect(() => {
    const filter = displayedData.filter((user) => {
      const matchesGender = selectedGender
        ? user.gender === selectedGender
        : true;
      const matchesCountry = selectedCountry
        ? user.location.country === selectedCountry
        : true;
      return matchesGender && matchesCountry;
    });
    console.log("useeffect");
    setFilteredData(filter);
  }, [displayedData, selectedGender, selectedCountry]);

  return (
    <div className="dataview__container">
      <Header setData={setData} setSearchTerm={setSearchTerm} />
      <SearchBar onSearch={handleSearch} />
      <FilterBar
        filter={data}
        filteredData={filteredData}
        // applyFilters={applyFilters}
        selectedGender={selectedGender}
        selectedCountry={selectedCountry}
        setSelectedGender={setSelectedGender}
        setSelectedCountry={setSelectedCountry}
      />
      <TableContainer
        data={filteredData}
        handleSort={handleSort}
        columnLabels={columnLabels}
      />
    </div>
  );
};

export default DataView;
