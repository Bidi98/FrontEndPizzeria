import "./Login.css";
import success from "../../images/success.png";
const SuccessRegister = ({ handleClick }) => {
  return (
    <div className="success-wrapper">
      <img src={success} className="success-image" />
      <span className="success-text">Registration completed successfully</span>
      <button onClick={() => handleClick(false)} className="login">
        Continue
      </button>
    </div>
  );
};

export default SuccessRegister;
