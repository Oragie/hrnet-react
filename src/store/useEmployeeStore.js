import { create } from "zustand";

// Fonction utilitaire pour charger les employés du localStorage
function loadEmployeesFromLocalStorage() {
  const data = localStorage.getItem("employees");
  return data ? JSON.parse(data) : [];
}

const useEmployeeStore = create((set) => ({
  employees: loadEmployeesFromLocalStorage(), // Charge au démarrage
  employee: {
    firstName: "",
    lastName: "",
    startDate: null,
    department: "",
    dateOfBirth: null,
    street: "",
    city: "",
    state: "",
    zipCode: "",
  },
  setEmployeeField: (field, value) => {
    return set((state) => ({
      employee: { ...state.employee, [field]: value },
    }));
  },
  addEmployee: () =>
    set((state) => {
      const updated = [...state.employees, state.employee];
      localStorage.setItem("employees", JSON.stringify(updated)); // Mets à jour le localStorage aussi
      return {
        employees: updated,
        employee: {
          firstName: "",
          lastName: "",
          startDate: null,
          department: "",
          dateOfBirth: null,
          street: "",
          city: "",
          state: "",
          zipCode: "",
        },
      };
    }),
}));

export default useEmployeeStore;
