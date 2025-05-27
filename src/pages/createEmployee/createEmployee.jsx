import { useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import states from "../../assets/states/states";
import departments from "../../assets/departments/departments";
import DatePickerField from "../../components/DatePicker";
import SelectField from "../../components/SelectField";
import EmployeeSuccessModal from "../../components/Modal/EmployeeSuccessModal";
import "react-datepicker/dist/react-datepicker.css";
import useEmployeeStore from "../../store/useEmployeeStore";
import { subYears } from "date-fns";
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

  const stateOptions = states.map((st) => ({
    value: st.abbreviation,
    label: st.name,
  }));

  const [isDateOfBirthFocused, setIsDateOfBirthFocused] = useState(false);
  const [isStartDateFocused, setIsStartDateFocused] = useState(false);

  return (
    <div className="create-employee">
      <h2 className="form-title">Create Employee</h2>
      <form onSubmit={handleSubmit} className="form">
        <fieldset>
          <legend>Personal Info</legend>
          <div className="form-row row-two-columns">
            {/* first name */}
            <div
              className={`floating-label ${employee.firstName ? "active" : ""}`}
            >
              <CustomInput
                name="firstName"
                type="text"
                value={employee.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                required
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            {/* last name */}
            <div
              className={`floating-label ${employee.lastName ? "active" : ""}`}
            >
              <CustomInput
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
            {/* date of birth */}
            <div
              className={`floating-label ${
                employee.dateOfBirth || isDateOfBirthFocused ? "active" : ""
              }`}
            >
              <DatePickerField
                selected={employee.dateOfBirth}
                onChange={(date) => handleDateChange("dateOfBirth", date)}
                onFocus={() => setIsDateOfBirthFocused(true)}
                onBlur={() => setIsDateOfBirthFocused(false)}
                placeholder="Date of Birth"
                id="date-of-birth"
                name="dateOfBirth"
                maxDate={subYears(new Date(), 16)}
                required
              />
              <label htmlFor="date-of-birth">Date of Birth</label>
            </div>

            {/* department select */}
            <div className="floating-label select-wrapper active">
              <SelectField
                label="Department"
                options={departments}
                value={employee.department}
                onChange={(option) => handleSelectChange("department", option)}
                placeholder="Select department..."
                id="department"
                name="department"
                required
              />
              <label htmlFor="department">Department</label>
            </div>
            {/* start date */}
            <div
              className={`floating-label ${
                employee.startDate || isStartDateFocused ? "active" : ""
              }`}
            >
              <DatePickerField
                selected={employee.startDate}
                onChange={(date) => handleDateChange("startDate", date)}
                onFocus={() => setIsStartDateFocused(true)}
                onBlur={() => setIsStartDateFocused(false)}
                placeholder="Start Date"
                id="start-date"
                name="startDate"
                required
              />
              <label htmlFor="start-date">Start Date</label>
            </div>
          </div>
        </fieldset>

        <fieldset className="address-box">
          <legend>Address</legend>

          {/* Row 1: Street only */}
          <div className="form-row row-full-width">
            <div
              className={`floating-label ${employee.street ? "active" : ""}`}
            >
              <CustomInput
                name="street"
                type="text"
                value={employee.street}
                onChange={handleInputChange}
                required
                placeholder="Street"
              />
              <label htmlFor="street">Street</label>
            </div>
          </div>

          {/* Row 2: City - State - ZipCode */}
          <div className="address-three-columns">
            {/* City */}
            <div className={`floating-label ${employee.city ? "active" : ""}`}>
              <CustomInput
                name="city"
                type="text"
                value={employee.city}
                onChange={handleInputChange}
                required
                placeholder="City"
              />
              <label htmlFor="city">City</label>
            </div>

            {/* State select */}
            <div className={`floating-label select-wrapper active`}>
              <SelectField
                options={stateOptions}
                value={employee.state}
                onChange={(option) => handleSelectChange("state", option)}
                placeholder="Select state..."
                id="state"
                name="state"
                required
              />
              <label htmlFor="state">State</label>
            </div>
            {/* Zip Code */}
            <div
              className={`floating-label ${employee.zipCode ? "active" : ""}`}
            >
              <CustomInput
                name="zipCode"
                type="text"
                value={employee.zipCode}
                onChange={handleInputChange}
                required
                placeholder="Zip Code"
              />
              <label htmlFor="zipCode">Zip Code</label>
            </div>
          </div>
        </fieldset>

        <button type="submit" className="submit-button">
          <img src={saveIcon} alt="" aria-hidden="true" className="btn-icon" />{" "}
          Save
        </button>
      </form>

      <EmployeeSuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        employee={employee}
      />
    </div>
  );
}

export default CreateEmployee;
