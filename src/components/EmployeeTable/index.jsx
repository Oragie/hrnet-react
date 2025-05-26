import { useState, useMemo } from "react";
import { flexRender } from "@tanstack/react-table";
import { getSortedRowModel } from "@tanstack/react-table";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { FaTrash } from "react-icons/fa";
import useEmployeeStore from "../../store/useEmployeeStore";
import "./_employee-table.scss";

function EmployeeTable() {
  const employees = useEmployeeStore((state) => state.employees);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const removeEmployee = useEmployeeStore((state) => state.removeEmployee);

  const [sorting, setSorting] = useState([]);

  // Columns for react-table v8+
  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("firstName", { header: "First Name" }),
      columnHelper.accessor("lastName", { header: "Last Name" }),
      columnHelper.accessor("startDate", {
        header: "Start Date",
        cell: (info) =>
          info.getValue()
            ? new Date(info.getValue()).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            : "",
      }),
      columnHelper.accessor("department", { header: "Department" }),
      columnHelper.accessor("dateOfBirth", {
        header: "Date of Birth",
        cell: (info) =>
          info.getValue()
            ? new Date(info.getValue()).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
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
          >
            <FaTrash />
          </button>
        ),
        enableSorting: false,
      },
    ],
    [columnHelper, removeEmployee]
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
    state: {
      sorting,
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), // <-- Ajoute ceci
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
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="sortable-header"
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
        <span>Rows per page:</span>
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
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
