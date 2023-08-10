import React, { FC, useState } from "react";
import { UserData } from "../../userData";

interface TableHeaderProps {
  data: UserData[];
  columnLabels: { key: string; label: string }[];
  handleSort: (column: "first" | "last" | "age") => void;
}

const TableHeader: FC<TableHeaderProps> = ({
  data,
  columnLabels,
  handleSort,
}) => {
  const [isAscFirstName, setIsAscFristName] = useState<boolean>(true);
  const [isAscLastName, setIsAscLastName] = useState<boolean>(true);
  const [isAscAge, setIsAscAge] = useState<boolean>(true);

  console.log(data);

  const sortByFirstName = () => {
    handleSort("first");
    setIsAscFristName(!isAscFirstName);
  };

  const sortByLastName = () => {
    handleSort("last");
    setIsAscLastName(!isAscLastName);
  };

  const sortByAge = () => {
    handleSort("age");
    setIsAscAge(!isAscAge);
  };

  return (
    <tr>
      {columnLabels.map((column) => (
        <th key={column.key}>
          {column.key === "name.first" ? (
            <div className="sorter">
              <p>First Name</p>
              <img
                src="assets/svg/arrow-up.svg"
                alt="sorter"
                className={isAscFirstName ? "asc" : "desc"}
                onClick={sortByFirstName}
              />
            </div>
          ) : column.key === "name.last" ? (
            <div className="sorter">
              <p>Last Name</p>
              <img
                src="assets/svg/arrow-up.svg"
                alt="sorter"
                className={isAscLastName ? "asc" : "desc"}
                onClick={sortByLastName}
              />
            </div>
          ) : column.key === "dob.age" ? (
            <div className="sorter">
              <p>Age</p>
              <img
                src="assets/svg/arrow-up.svg"
                alt="sorter"
                className={isAscAge ? "asc" : "desc"}
                onClick={sortByAge}
              />
            </div>
          ) : (
            column.label
          )}
        </th>
      ))}
    </tr>
  );
};

export default TableHeader;
