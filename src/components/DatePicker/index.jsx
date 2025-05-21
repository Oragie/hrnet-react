import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useEmployeeStore from "../../store/useEmployeeStore";

function DateOfBirthPicker() {
  const { employee, setEmployeeField } = useEmployeeStore();

  return (
    <div className="form-group">
      <label htmlFor="date-of-birth">Date of Birth</label>
      <ReactDatePicker
        selected={employee.dateOfBirth}
        onChange={(date) => setEmployeeField("dateOfBirth", date)}
        dateFormat="dd/MM/yyyy"
        id="date-of-birth"
        className="date-picker"
        placeholderText="Select date of birth"
      />
    </div>
  );
}

export default DateOfBirthPicker;
