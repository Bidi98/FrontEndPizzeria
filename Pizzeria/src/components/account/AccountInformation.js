const AccountInformation = ({ user, userData }) => {
  return (
    <div className="account-information">
      <div className="account-title">ACCOUNT</div>
      <div className="account-info-content">
        <span className="info-element">
          EMAIL:&nbsp;
          <span className="account-field">
            {user &&
              user[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
              ]}
          </span>
        </span>
        <span className="info-element">
          ADDRESS :&nbsp; <span className="account-field">{userData}</span>
        </span>
      </div>
    </div>
  );
};

export default AccountInformation;
