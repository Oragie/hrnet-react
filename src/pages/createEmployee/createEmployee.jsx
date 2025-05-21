import { useState } from "react";
import Select from "react-select";
import states from "../../assets/states/states";
import departments from "../../assets/departments/departments";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useEmployeeStore from "../../store/useEmployeeStore";
import { Modal } from "@oragie/react-modal-lib";

function CreateEmployee() {
  const { employee, setEmployeeField, addEmployee } = useEmployeeStore();
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    setEmployeeField(e.target.name, e.target.value);
  };

  const handleDateChange = (field, date) => {
    setEmployeeField(field, date);
  };

  const handleSelectChange = (field, option) => {
    setEmployeeField(field, option?.value || "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee();
    setShowModal(true);
  };

  return (
    <div className="create-employee container">
      <h2 className="text-2xl font-bold mb-4">Create Employee</h2>
      <form onSubmit={handleSubmit} className="form grid gap-4">
        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          onChange={handleInputChange}
          required
        />
        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          onChange={handleInputChange}
          required
        />

        <label>Date of Birth</label>
        <DatePicker
          selected={employee.dateOfBirth}
          onChange={(date) => handleDateChange("dateOfBirth", date)}
          placeholderText="Select birth date"
          showYearDropdown
        />

        <label>Start Date</label>
        <DatePicker
          selected={employee.startDate}
          onChange={(date) => handleDateChange("startDate", date)}
          placeholderText="Select start date"
          showYearDropdown
        />

        <input
          name="street"
          type="text"
          placeholder="Street"
          onChange={handleInputChange}
          required
        />
        <input
          name="city"
          type="text"
          placeholder="City"
          onChange={handleInputChange}
          required
        />
        <input
          name="zipCode"
          type="text"
          placeholder="Zip Code"
          onChange={handleInputChange}
          required
        />

        <label>State</label>
        <Select
          options={states}
          onChange={(option) => handleSelectChange("state", option)}
          placeholder="Select state"
        />

        <label>Department</label>
        <Select
          options={departments}
          onChange={(option) => handleSelectChange("department", option)}
          placeholder="Select department"
        />

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>

      <Modal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        title="Employee created"
        message="The employee has been successfully added!"
      />
    </div>
  );
}

export default CreateEmployee;
