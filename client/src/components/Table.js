// .js
import React from "react";
import { useTable } from "react-table";

const Table = ({ columns, data, onViewClick }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className="table-auto w-full">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="p-2 text-left">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const rowId = row.original._id; // Extract _id from data
          return (
            <tr
              {...row.getRowProps()}
              onClick={() => onViewClick(rowId)}
              className="border-b cursor-pointer"
            >
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="p-2 text-left">
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
