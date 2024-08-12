import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import "./Table.css";

const Table = ({ data }: { data: any[] }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: () => <span>ID</span>,
        cell: (info:any) => <span>{info.getValue()}</span>,
      },
      {
        accessorKey: "firstname",
        header: () => <span>First Name</span>,
        cell: (info:any) => <span>{info.getValue()}</span>,
      },
      {
        accessorKey: "lastname",
        header: () => <span>Last Name</span>,
        cell: (info:any) => <span>{info.getValue()}</span>,
      },
      {
        accessorKey: "employeenumber",
        header: () => <span>Employee Number</span>,
        cell: (info:any) => <span>{info.getValue()}</span>,
      },
      {
        accessorKey: "salary",
        header: () => <span>Salary</span>,
        cell: (info:any) => <span>{info.getValue()}</span>,
      },
      {
        accessorKey: "country",
        header: () => <span>Country</span>,
        cell: (info:any) => <span>{info.getValue()}</span>,
      },
    ],
    []
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSortingRemoval: false
  });

  return (
    <div className="table-container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup:any) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header:any) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() && (
                    <span>
                      {header.column.getIsSorted() === 'asc'? '' : ''}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;