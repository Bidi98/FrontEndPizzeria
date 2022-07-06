import "./Login.css";
import imageX from "../../images/x.svg";
import { useEffect, useState } from "react";
import UserForm from "./UserForm.js";
import * as UserServices from "../../services/UserServices";
import SuccessRegister from "./SuccessRegister";
import { user } from "fontawesome";

function Login({ handleCloseModal, userLogIn }) {
  const [register, setRegister] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const handleChange = () => {
    if (register) {
      setRegister(false);
    } else {
      setRegister(true);
    }
    setServerErrors({});
  };
  useEffect(() => {
    setRegister(true);
    setSuccess(false);
  }, []);

  const handleRegister = async (e, user) => {
    e.preventDefault();
    try {
      await UserServices.register(user);
      setSuccess(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const serverErrors = {};
        serverErrors.email = error.response.data;
        setServerErrors((prevErrors) => ({ ...prevErrors, serverErrors }));
      }
    }
  };
  const handleLogIn = async (e, user) => {
    e.preventDefault();
    try {
      await UserServices.login(user);
      userLogIn();
      handleCloseModal(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        const serverErrors = {};
        serverErrors.password = error.response.data;
        setServerErrors((prevErrors) => ({ ...prevErrors, serverErrors }));
      }
    }
  };
  return (
    <div className="login-modal-main">
      <div className="modal-content">
        <div
          onClick={() => handleCloseModal(false)}
          className="close-login-button"
        >
          <img className="x-image-login" src={imageX}></img>
        </div>
        {!register && !success && (
          <UserForm
            handleChange={handleChange}
            title="REGISTER"
            buttonName="REGISTER"
            switchName="Log in"
            handleSubmit={handleRegister}
            serverErrors={serverErrors}
          />
        )}
        {register && !success && (
          <UserForm
            handleChange={handleChange}
            title="LOG IN"
            buttonName="LOG IN"
            switchName="Register"
            handleSubmit={handleLogIn}
            serverErrors={serverErrors}
          />
        )}
        {success && <SuccessRegister handleClick={handleCloseModal} />}
      </div>
    </div>
  );
}

export default Login;
