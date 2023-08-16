import React, { FC } from "react";
import TableHeader from "../TableHeader";
import TableRow from "../TableRow";
import { UserData } from "../../userData";

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
  return (
    <div className="table__container">
      <table className="table__content">
        <tbody>
          <TableHeader
            data={data}
            columnLabels={columnLabels}
            handleSort={handleSort}
          />
          {data.map((data: UserData, index: number) => (
            <TableRow data={data} key={index} columnLabels={columnLabels} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableContainer;
