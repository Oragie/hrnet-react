import EmployeeTable from "../../components/EmployeeTable";

function EmployeeList() {
  return (
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Liste des employés</h2>
      <EmployeeTable />
    </main>
  );
}

export default EmployeeList;
