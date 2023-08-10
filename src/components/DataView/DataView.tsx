import React, { useEffect, useState } from "react";
import Header from "../Header";
import TableContainer from "../Table/TableContainer";
import { UserData } from "../userData";
import SearchBar from "../SearchBar";

const DataView = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<
    "first" | "last" | "age" | "none"
  >("none");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data.results);
        console.log(data);
      });
  }, []);

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

  return (
    <div className="dataview__container">
      <Header setData={setData} setSearchTerm={setSearchTerm} />
      <SearchBar onSearch={handleSearch} />
      <TableContainer
        data={sortedData}
        handleSort={handleSort}
        columnLabels={columnLabels}
      />
    </div>
  );
};

export default DataView;
