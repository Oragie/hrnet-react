import { create } from "zustand";

const useEmployeeStore = create((set) => ({
  employees: [],
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
  setEmployeeField: (field, value) =>
    set((state) => ({
      employee: { ...state.employee, [field]: value },
    })),
  addEmployee: () =>
    set((state) => ({
      employees: [...state.employees, state.employee],
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
    })),
}));

export default useEmployeeStore;
