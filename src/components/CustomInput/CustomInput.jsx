import { forwardRef } from "react";

// Utilitaire pour filtrer les caractères selon le champ
function filterInput(name, value) {
  switch (name) {
    case "firstName":
    case "lastName":
      return value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, ""); // lettres, espaces, accents, tirets, apostrophes
    case "street":
    case "city":
      return value.replace(/[^a-zA-ZÀ-ÿ0-9\s'-]/g, ""); // lettres, chiffres, espaces, accents, tirets, apostrophes
    case "zipCode":
      return value.replace(/[^a-zA-Z0-9-]/g, ""); // lettres, chiffres, tirets
    default:
      return value;
  }
}

const CustomInput = forwardRef(
  (
    { value, onChange, onBlur, onFocus, placeholder, id, name, ...rest },
    ref
  ) => {
    const handleChange = (e) => {
      let val = filterInput(name, e.target.value);

      if (onChange) {
        onChange({
          target: {
            value: val,
            name,
          },
        });
      }
    };

    return (
      <input
        ref={ref}
        value={value || ""}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        id={id}
        name={name}
        autoComplete="off"
        {...rest}
      />
    );
  }
);

export default CustomInput;
