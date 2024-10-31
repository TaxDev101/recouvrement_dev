import React from "react";

const AppInputField = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="form-group">
      <label className="col-form-label" htmlFor={id}>
        {label}
      </label>
      <input
        className="form-control form-control-sm"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default AppInputField;
