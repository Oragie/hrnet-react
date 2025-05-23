import { forwardRef, useState } from "react";

function parseAndFormatDate(str) {
  // Retire tout sauf chiffres
  let cleaned = str.replace(/[^0-9]/g, "");
  if (cleaned.length === 6) {
    // mmddyy → mm/dd/20yy
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/20${cleaned.slice(4, 6)}`;
  }
  if (cleaned.length === 8) {
    // mmddyyyy → mm/dd/yyyy
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  }
  return str;
}

const CustomDateInput = forwardRef(
  (
    {
      value,
      onChange,
      onBlur,
      onFocus,
      placeholder,
      id,
      name,
      ...rest
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value || "");

    // Met à jour l'affichage localement
    const handleChange = (e) => {
      setInputValue(e.target.value);
    };

    // À la validation, formate et transmet à react-datepicker
    const handleBlur = (e) => {
      let val = e.target.value;
      val = parseAndFormatDate(val);
      setInputValue(val);

      // Tente de parser la date pour react-datepicker
      const [month, day, year] = val.split("/");
      let dateObj = null;
      if (
        month &&
        day &&
        year &&
        month.length === 2 &&
        day.length === 2 &&
        year.length === 4
      ) {
        dateObj = new Date(`${year}-${month}-${day}`);
        if (isNaN(dateObj.getTime())) dateObj = null;
      }
      if (onChange) {
        onChange(dateObj);
      }
      if (onBlur) onBlur(e);
    };

    // Pour valider à la touche Entrée
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleBlur(e);
      }
    };

    return (
      <input
        ref={ref}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        id={id}
        name={name}
        autoComplete="off"
        {...rest}
      />
    );
  }
);

export default CustomDateInput;