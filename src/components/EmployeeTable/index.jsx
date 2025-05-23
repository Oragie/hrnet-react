import { useState, useMemo } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import useEmployeeStore from "../../store/useEmployeeStore";
import "./_employee-table.scss";

function EmployeeTable() {
  const employees = useEmployeeStore((state) => state.employees);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);

  // Columns for react-table v8+
  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("firstName", { header: "First Name" }),
      columnHelper.accessor("lastName", { header: "Last Name" }),
      columnHelper.accessor("startDate", { header: "Start Date" }),
      columnHelper.accessor("department", { header: "Department" }),
      columnHelper.accessor("dateOfBirth", { header: "Date of Birth" }),
      columnHelper.accessor("street", { header: "Street" }),
      columnHelper.accessor("city", { header: "City" }),
      columnHelper.accessor("state", { header: "State" }),
      columnHelper.accessor("zipCode", { header: "Zip Code" }),
    ],
    []
  );

  // Global filtering BEFORE passing to useReactTable
  const data = useMemo(() => {
    if (!searchTerm) return employees;
    const search = searchTerm.toLowerCase();
    return employees.filter((emp) =>
      [emp.firstName, emp.lastName, emp.department, emp.city, emp.state]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }, [employees, searchTerm]);

  // react-table v8+ with pagination
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
  });

  // Change page size
  const handlePageSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    table.setPageSize(newSize);
    table.setPageIndex(0); // Go back to first page
  };

  return (
    <div className="employee-table">
      <div className="employee-table-searchbar">
        <input
          type="text"
          placeholder="Search all columns"
          className="employee-table-searchinput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="employee-table-scroll">
        <table className="employee-table-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{cell.getValue()}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="employee-table-empty">
                  No results for "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="employee-table-pagination">
        <span>Rows per page:</span>
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span>
          {table.getState().pagination.pageIndex * pageSize + 1}-
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * pageSize,
            data.length
          )}{" "}
          of {data.length}
        </span>
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"|<"}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">|"}
        </button>
      </div>
    </div>
  );
}

export default EmployeeTable;
