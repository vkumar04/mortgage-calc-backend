import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { amortizationData } from "../../types";
interface DataTableProps {
  amortizationData: amortizationData[];
}

export const DataTable = ({ amortizationData }: DataTableProps) => {
  const columnHelper = createColumnHelper<amortizationData>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("month", {
        header: "Month",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("payment", {
        header: "Payment",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("principal", {
        header: "Principal",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("interest", {
        header: "Interest",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("balance", {
        header: "Balance",
        cell: (info) => info.getValue(),
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable({
    columns,
    data: amortizationData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (amortizationData.length === 0) {
    return <div>Fill out the form to display table</div>;
  }

  return (
    <div>
      <h1>Amortization Table</h1>
      <table className="table table-zebra">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
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
      <div className="join join-vertical mt-4 lg:join-horizontal">
        <button
          className="btn btn-primary join-item"
          onClick={() => table.setPageIndex(0)}
        >
          First Page
        </button>
        <button className="btn join-item" onClick={() => table.nextPage()}>
          Next Page
        </button>
        <button className="btn join-item" onClick={() => table.previousPage()}>
          Prev Page
        </button>
        <button
          className="btn btn-primary join-item"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last Page
        </button>
      </div>
    </div>
  );
};
