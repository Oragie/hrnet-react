import Select from "react-select";
import "./_selectfield.scss";

function SelectField({
  label,
  options,
  value,
  onChange,
  placeholder,
  id,
  required = false,
  name,
}) {
  return (
    <div className="selectfield-wrapper">
      <Select
        inputId={id}
        name={name}
        label={label}
        options={options}
        value={options.find((opt) => opt.value === value) || null}
        onChange={onChange}
        placeholder={placeholder}
        classNamePrefix="react-select"
        required={required}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#73842c", // $green-primary
            primary25: "#232a1c", // foncé sur hover
            neutral0: "#2b2c2f", // $dark-surface (fond)
            neutral80: "#f3f3f3", // $dark-text (texte)
            neutral20: "#3c3d3f", // $dark-border
            neutral30: "#73842c", // border focus
            neutral60: "#73842c",
            neutral90: "#f3f3f3",
          },
        })}
      />
    </div>
  );
}

export default SelectField;
