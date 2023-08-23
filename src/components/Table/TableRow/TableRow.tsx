import React, { FC } from "react";
import { UserData } from "../../userData";

interface TableRowProps {
  data: UserData;
  columnLabels: { key: string; label: string }[];
}

const TableRow: FC<TableRowProps> = ({ data, columnLabels }) => {
  const getDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    return `${dateObj.getFullYear()}, ${dateObj.toLocaleDateString(undefined, {
      month: "long",
    })} ${dateObj.getDate()}`;
  };

  return (
    <>
      <tr>
        <td>
          <img
            src={data.picture.thumbnail}
            alt="user"
            className="user__image"
          />
        </td>
        <td>
          <p>{data.name.first}</p>
        </td>
        <td>
          <p>{data.name.last}</p>
        </td>
        <td>
          <p>{data.gender}</p>
        </td>
        <td>
          <p>{getDate(data.dob.date)}</p>
        </td>
        <td>
          <p>{data.dob.age}</p>
        </td>
        <td>
          <p>{data.email}</p>
        </td>
        <td>
          <p>{data.phone}</p>
        </td>
        <td>
          <p>{data.location.country}</p>
        </td>
        <td>
          <p>{data.nat}</p>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
