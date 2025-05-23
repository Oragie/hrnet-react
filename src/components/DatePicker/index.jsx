import ReactDatePicker from "react-datepicker";
import CustomDateInput from "../CustomInput/CustomDateInput";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerField({
  selected,
  onChange,
  placeholder,
  id,
  maxDate,
  minDate,
  required = false,
  onFocus,
  onBlur,
  name,
}) {
  return (
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
      autoComplete="off"
      onFocus={onFocus}
      onBlur={onBlur}
      customInput={
        <CustomDateInput id={id} name={name} placeholder={placeholder} />
      }
    />
  );
}

export default DatePickerField;
