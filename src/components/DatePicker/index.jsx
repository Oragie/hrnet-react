import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerField({
  label,
  selected,
  onChange,
  placeholder,
  id,
  maxDate,
  minDate,
  required = false,
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="MM/dd/yyyy"
        id={id}
        className="date-picker"
        placeholderText={placeholder}
        maxDate={maxDate}
        minDate={minDate}
        showYearDropdown
        required={required}
      />
    </div>
  );
}

export default DatePickerField;
