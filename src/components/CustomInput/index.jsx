import { forwardRef } from "react";

const CustomInput = forwardRef(
  ({ value, onClick, onChange, placeholder, name }, ref) => (
    <div className={`floating-label ${value ? "active" : ""}`}>
      <input
        onClick={onClick}
        onChange={onChange}
        ref={ref}
        value={value || ""}
        placeholder={placeholder}
        name={name}
        required
      />
      <label htmlFor={name}>{placeholder}</label>
    </div>
  )
);

export default CustomInput;
