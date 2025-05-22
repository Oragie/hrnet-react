import { useState } from "react";
import Select from "react-select";
import states from "../../assets/states/states";
import departments from "../../assets/departments/departments";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useEmployeeStore from "../../store/useEmployeeStore";
import { Modal } from "@oragie/react-modal-lib";
import acceptIcon from "../../assets/img/accept.png";
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

  const isFormValid = () => {
    const {
      firstName,
      lastName,
      dateOfBirth,
      startDate,
      department,
      state,
      street,
      city,
      zipCode,
    } = employee;
    return (
      firstName &&
      lastName &&
      dateOfBirth &&
      startDate &&
      department &&
      state &&
      street &&
      city &&
      zipCode
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      addEmployee();
      setShowModal(true);
    }
  };

  return (
    <div className="create-employee container">
      <h2 className="form-title">Create Employee</h2>
      <form onSubmit={handleSubmit} className="form">
        <fieldset>
          <legend>Personal Info</legend>
          <div className="form-row row-two-columns">
            <div
              className={`floating-label ${employee.firstName ? "active" : ""}`}
            >
              <input
                name="firstName"
                type="text"
                value={employee.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                required
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div
              className={`floating-label ${employee.lastName ? "active" : ""}`}
            >
              <input
                name="lastName"
                type="text"
                value={employee.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                required
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
          </div>

          <div className="form-row row-three-columns">
            <div
              className={`floating-label ${
                employee.dateOfBirth ? "active" : ""
              }`}
            >
              <DatePicker
                selected={employee.dateOfBirth}
                onChange={(date) => handleDateChange("dateOfBirth", date)}
                placeholderText="mm/dd/yyyy"
                dateFormat="mm/dd/yyyy"
                showYearDropdown
                required
              />
              <label>Select Date of Birth</label>
            </div>

            <div className="floating-label select-wrapper">
              <Select
                options={departments}
                onChange={(option) => handleSelectChange("department", option)}
                placeholder="Department"
                classNamePrefix="react-select"
              />
            </div>
            <div
              className={`floating-label ${employee.startDate ? "active" : ""}`}
            >
              <DatePicker
                selected={employee.startDate}
                onChange={(date) => handleDateChange("startDate", date)}
                placeholderText="mm/dd/yyyy"
                dateFormat="MM/dd/yyyy"
                showYearDropdown
                required
              />
              <label>Start Date</label>
            </div>
          </div>
        </fieldset>

        <fieldset className="address-box">
          <legend>Address</legend>
          <div className="floating-label">
            <input
              name="street"
              type="text"
              value={employee.street}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="street">Street</label>
          </div>
          <div className="floating-label">
            <input
              name="city"
              type="text"
              value={employee.city}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="city">City</label>
          </div>
          <div className="form-row">
            <div className="floating-label select-wrapper">
              <Select
                options={states}
                onChange={(option) => handleSelectChange("state", option)}
                placeholder="State"
                classNamePrefix="react-select"
              />
            </div>
            <div className="floating-label">
              <input
                name="zipCode"
                type="text"
                value={employee.zipCode}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="zipCode">Zip Code</label>
            </div>
          </div>
        </fieldset>

        <button type="submit" className="submit-button">
          <img
            src="/src/assets/img/savedisk.png"
            alt="Save"
            className="btn-icon"
          />{" "}
          Save
        </button>
      </form>

      <Modal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        title="Employee created"
        message={
          <>
            <img src={acceptIcon} alt="accepted" className="modal-icon" /> The
            employee has been successfully added!
          </>
        }
      />
    </div>
  );
}

export default CreateEmployee;
