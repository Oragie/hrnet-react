import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "@oragie/react-modal-lib";

import states from "../../assets/states/states";
import departments from "../../assets/departments/departments";
import useEmployeeStore from "../../store/useEmployeeStore";

import saveIcon from "../../assets/img/savedisk.png";
import "./_create-employee.scss";

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
      <h2 className="form-title">Create Employee</h2>

      <form className="employee-form" onSubmit={handleSubmit}>
        <fieldset className="section">
          <legend>Personal Info</legend>
          <div className="row">
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
          </div>
          <div className="row">
            <div>
              <label>Date of Birth</label>
              <DatePicker
                selected={employee.dateOfBirth}
                onChange={(date) => handleDateChange("dateOfBirth", date)}
                placeholderText="Select birth date"
                showYearDropdown
              />
            </div>

            <div>
              <label>Start Date</label>
              <DatePicker
                selected={employee.startDate}
                onChange={(date) => handleDateChange("startDate", date)}
                placeholderText="Select start date"
                showYearDropdown
              />
            </div>

            <div className="select-wrapper">
              <label>Department</label>
              <Select
                options={departments}
                onChange={(option) => handleSelectChange("department", option)}
                placeholder="Select department"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="section address">
          <legend>Address</legend>
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
          <div className="row">
            <div className="select-wrapper">
              <label>State</label>
              <Select
                options={states}
                onChange={(option) => handleSelectChange("state", option)}
                placeholder="Select state"
              />
            </div>
            <input
              name="zipCode"
              type="text"
              placeholder="Zip Code"
              onChange={handleInputChange}
              required
            />
          </div>
        </fieldset>

        <button type="submit" className="save-btn">
          <img src={saveIcon} alt="save" />
          Save
        </button>
      </form>

      <Modal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        title="Employee Created"
        message="The employee has been successfully added!"
      />
    </div>
  );
}

export default CreateEmployee;
