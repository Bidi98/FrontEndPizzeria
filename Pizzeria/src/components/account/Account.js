import "./Account.css";
import { Link, useParams } from "react-router-dom";
import AccountInformation from "./AccountInformation";
import ChangePassword from "./ChangePassword.js";
import { useState } from "react";
import { useEffect } from "react";
import Orders from "./Orders";

const Account = ({ user, userData, orders }) => {
  const [currentTab, setCurrentTab] = useState(undefined);
  const { tab } = useParams();
  useEffect(() => {
    setCurrentTab(tab);
  });
  return (
    <div className="account-main">
      <div className="account-navbar">
        <ul className="account-list">
          <li className="account-navbar-element">
            <div className="account-navbar-div">
              <Link to="/account" className="account-link">
                <span className="navbar-account-text">INFORMATION</span>
              </Link>
            </div>
          </li>
          <li className="account-navbar-element">
            <div className="account-navbar-div">
              <Link
                to="/account/passwordChange"
                params={{ tab: "passwordChange" }}
                className="account-link"
              >
                <span className="navbar-account-text">PASSWORD</span>
              </Link>
            </div>
          </li>
          <li className="account-navbar-element">
            <div className="account-navbar-div">
              <Link to="/account/orders" className="account-link">
                <span className="navbar-account-text">ORDERS</span>
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <div className="account-content">
        {currentTab === undefined && (
          <AccountInformation user={user} userData={userData} />
        )}
        {currentTab === "passwordChange" && <ChangePassword />}
        {currentTab === "orders" && <Orders orders={orders} />}
      </div>
    </div>
  );
};

export default Account;
