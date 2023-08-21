import React, { FC, useState } from "react";
import TableHeader from "../TableHeader";
import TableRow from "../TableRow";
import { UserData } from "../../userData";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
interface TableContainerProps {
  data: UserData[];
  columnLabels: { key: string; label: string }[];
  handleSort: (column: "first" | "last" | "age") => void;
}

const TableContainer: FC<TableContainerProps> = ({
  data,
  columnLabels,
  handleSort,
}) => {
  // Pagination
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  const paginationStyle = {
    width: "500px",
    margin: "20px auto",
    display: "flex",
    justifyContent: "space-evenly",
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="table__container">
      <Pagination
        current={currentPage}
        total={data.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
        className="table-pagination"
        style={paginationStyle}
        hideOnSinglePage={true}
      />
      <table className="table__content">
        <tbody>
          <TableHeader
            data={data}
            columnLabels={columnLabels}
            handleSort={handleSort}
          />
          {displayedData.map((data: UserData, index: number) => (
            <TableRow data={data} key={index} columnLabels={columnLabels} />
          ))}
        </tbody>
      </table>
      <Pagination
        current={currentPage}
        total={data.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
        className="table-pagination"
        style={paginationStyle}
        hideOnSinglePage={true}
      />
    </div>
  );
};

export default TableContainer;
