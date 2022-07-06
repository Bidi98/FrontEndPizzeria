import React from "react";
import "./Login.css";

const Input = ({ formValue, label, onChange, name, error }) => {
  return (
    <>
      <span className="login-field-title">{label}</span>
      <input
        className="login-field-input"
        value={formValue}
        onChange={(e) => onChange(e)}
        name={name}
      ></input>
      {error && <div className="error-message">{error}</div>}
    </>
  );
};

export default Input;
