import EmployeeTable from "../../components/EmployeeTable";
import "./_employeeList.scss";

function EmployeeList() {
  return (
    <main className="employee-list-main">
      <h2 className="employee-list-title">Employee List</h2>
      <EmployeeTable />
    </main>
  );
}

export default EmployeeList;
