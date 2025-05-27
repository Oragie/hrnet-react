import { useState, useMemo } from "react";
import { flexRender } from "@tanstack/react-table";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { FaTrash } from "react-icons/fa";
import useEmployeeStore from "../../store/useEmployeeStore";
import "./_employee-table.scss";

function EmployeeTable() {
  const employees = useEmployeeStore((state) => state.employees);
  const removeEmployee = useEmployeeStore((state) => state.removeEmployee);

  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("firstName", { header: "First Name" }),
      columnHelper.accessor("lastName", { header: "Last Name" }),
      columnHelper.accessor("startDate", {
        header: "Start Date",
        cell: (info) =>
          info.getValue()
            ? new Date(info.getValue()).toLocaleDateString("en-US")
            : "",
      }),
      columnHelper.accessor("department", { header: "Department" }),
      columnHelper.accessor("dateOfBirth", {
        header: "Date of Birth",
        cell: (info) =>
          info.getValue()
            ? new Date(info.getValue()).toLocaleDateString("en-US")
            : "",
      }),
      columnHelper.accessor("street", { header: "Street" }),
      columnHelper.accessor("city", { header: "City" }),
      columnHelper.accessor("state", { header: "State" }),
      columnHelper.accessor("zipCode", { header: "Zip Code" }),
      {
        id: "delete",
        header: "",
        cell: (info) => (
          <button
            className="employee-table-delete-btn"
            title="Delete employee"
            onClick={() => removeEmployee(info.row.index)}
            aria-label="Delete employee"
          >
            <FaTrash />
          </button>
        ),
        enableSorting: false,
      },
    ],
    [removeEmployee]
  );

  const filteredData = useMemo(() => {
    if (!searchTerm) return employees;
    const term = searchTerm.toLowerCase();
    return employees.filter((emp) =>
      [emp.firstName, emp.lastName, emp.department, emp.city, emp.state]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [employees, searchTerm]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: false,
  });

  return (
    <div className="employee-table">
      <div className="employee-table-searchbar">
        <input
          type="text"
          placeholder="Search all columns"
          className="employee-table-searchinput"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPageIndex(0);
          }}
        />
      </div>

      <div className="employee-table-scroll">
        <table className="employee-table-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    role="columnheader"
                    tabIndex={0}
                    onClick={header.column.getToggleSortingHandler()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        header.column.toggleSorting();
                      }
                    }}
                    aria-sort={
                      header.column.getIsSorted() === "asc"
                        ? "ascending"
                        : header.column.getIsSorted() === "desc"
                        ? "descending"
                        : "none"
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc" && " 🔼"}
                    {header.column.getIsSorted() === "desc" && " 🔽"}
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
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
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
        <label htmlFor="rows-per-page" className="visually-hidden">
          Rows per page
        </label>
        <select
          id="rows-per-page"
          name="rows-per-page"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageIndex(0);
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>

        <span>
          {pageIndex * pageSize + 1}-
          {Math.min((pageIndex + 1) * pageSize, filteredData.length)} of{" "}
          {filteredData.length}
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
