import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function formatInputToDateString(str) {
  // Si déjà au format mm/dd/yyyy, on ne touche pas
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) return str;
  // Si au format mmddyyyy, on convertit
  if (/^\d{8}$/.test(str)) {
    return `${str.slice(0, 2)}/${str.slice(2, 4)}/${str.slice(4, 8)}`;
  }
  return str;
}

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
  // On intercepte le blur pour reformater si besoin
  const handleRawChange = (e) => {
    const val = e.target.value;
    const formatted = formatInputToDateString(val);
    if (formatted !== val) {
      // On force la valeur formatée dans le champ
      e.target.value = formatted;
    }
  };

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
      name={name}
      // Ce handler permet de reformater la saisie utilisateur à la sortie du champ
      onInputBlur={handleRawChange}
    />
  );
}

export default DatePickerField;
