const ChangePassowrd = () => {
  return (
    <div className="account-information">
      <div className="account-title">PASSWORD CHANGE</div>
      <div className="account-info-content">
        <form className="password-change-form">
          <span className="info-element">PASSWORD :</span>
          <input type="text" className="account-form-field"></input>

          <span className="info-element">CONFIRM PASSWORD :</span>
          <input type="text" className="account-form-field"></input>

          <button className="login password">SAVE</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassowrd;
