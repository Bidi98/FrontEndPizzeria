import "./Login.css";
import { useState } from "react";
import Input from "./Input";
import { useEffect } from "react";

const UserForm = ({
  handleChange,
  title,
  buttonName,
  switchName,
  handleSubmit,
  serverErrors,
}) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    const errors = {};
    if (user.email.trim() === "") {
      errors.email = "Email is required.";
    }
    if (user.password.trim() === "") {
      errors.password = "Password is required.";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const sendSumbit = (e) => {
    e.preventDefault();
    setUser({ ...user, password: "" });
    const errors = validate();
    if (errors) {
      console.log(errors);
      setErrors(errors);
      return;
    }
    handleSubmit(e, user);
  };
  useEffect(() => {
    if (Object.keys(serverErrors).length > 0) {
      setErrors(serverErrors.serverErrors);
    }
  }, [serverErrors]);

  return (
    <div className="login-wrapper">
      <div className="login-top-wrapper">
        <span className="login-title">{title}</span>
        <button onClick={handleChange} className="login-button">
          {switchName}
        </button>
      </div>
      <form
        className="login-form"
        onSubmit={(e) => {
          sendSumbit(e);
        }}
      >
        <Input
          label="E-MAIL ADDRESS"
          name="email"
          formValue={user.email}
          onChange={handleInputChange}
          error={errors.email}
        />
        <Input
          label="PASSWORD"
          name="password"
          formValue={user.password}
          onChange={handleInputChange}
          error={errors.password}
        />

        <button className="login">{buttonName}</button>
      </form>
    </div>
  );
};

export default UserForm;
