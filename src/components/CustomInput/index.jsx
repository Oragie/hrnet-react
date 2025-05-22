import { forwardRef, useState } from "react";

const formatDateString = (str) => {
  const cleaned = str.replace(/\D/g, "");
  if (cleaned.length >= 8) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(
      4,
      8
    )}`;
  }
  return str;
};

const CustomInput = forwardRef(
  ({ value, onClick, onChange, placeholder, name }, ref) => {
    const [inputValue, setInputValue] = useState(value || "");

    const handleInputChange = (e) => {
      const formatted = formatDateString(e.target.value);
      setInputValue(formatted);
      if (onChange) onChange({ target: { name, value: formatted } });
    };

    return (
      <div className={`floating-label ${inputValue ? "active" : ""}`}>
        <input
          ref={ref}
          type="text"
          name={name}
          placeholder={placeholder}
          value={inputValue}
          onClick={onClick}
          onChange={handleInputChange}
          onBlur={(e) => {
            const match = inputValue.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
            if (match) setInputValue(inputValue);
          }}
          required
        />
        <label htmlFor={name}>{placeholder}</label>
      </div>
    );
  }
);

export default CustomInput;
