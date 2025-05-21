import { useState } from "react";
import useEmployeeStore from "../../store/useEmployeeStore";
import "./_employee-table.scss";

function EmployeeTable() {
  const employees = useEmployeeStore((state) => state.employees);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter((emp) => {
    const search = searchTerm.toLowerCase();
    return (
      emp.firstName.toLowerCase().includes(search) ||
      emp.lastName.toLowerCase().includes(search) ||
      emp.department.toLowerCase().includes(search) ||
      emp.city.toLowerCase().includes(search) ||
      emp.state.toLowerCase().includes(search)
    );
  });

  return (
    <div className="employee-table">
      <div className="search-bar mb-4">
        <input
          type="text"
          placeholder="Rechercher un employé..."
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Date d'embauche</th>
              <th>Département</th>
              <th>Date de naissance</th>
              <th>Rue</th>
              <th>Ville</th>
              <th>État</th>
              <th>Code postal</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.startDate?.toLocaleDateString()}</td>
                  <td>{emp.department}</td>
                  <td>{emp.dateOfBirth?.toLocaleDateString()}</td>
                  <td>{emp.street}</td>
                  <td>{emp.city}</td>
                  <td>{emp.state}</td>
                  <td>{emp.zipCode}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  Aucun résultat pour « {searchTerm} »
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeTable;
