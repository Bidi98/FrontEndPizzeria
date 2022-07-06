import "./NavBar.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import logo from "../../images/logo.png";
import cart from "../../images/cart.png";
import arrow from "../../images/arrow.png";

function NavBar({ cartCount, handleModal, user, handleLogout }) {
  const [mobile, setMobile] = useState(false);
  const toggleMobileMenu = (menu) => {
    if (mobile) {
      setMobile(false);
    } else {
      setMobile(true);
    }
    console.log(mobile);
  };
  return (
    <div className="navBar">
      <Link to="/">
        <img src={logo} className="logo" onClick={() => setMobile(false)} />
      </Link>
      <div className="nav-wrapper">
        <ul className="nav-list">
          <li className="nav-element">
            <div className="nav-div">
              <Link to="/menu" className="text-link">
                <span className="nav-span">MENU</span>
              </Link>
            </div>
          </li>
          <li className="nav-element">
            <div className="nav-div">
              <Link to="/restaurants" className="text-link">
                <span className="nav-span">Restaurants</span>
              </Link>
            </div>
          </li>
          {Object.keys(user).length !== 0 ? (
            <React.Fragment>
              <li className="nav-element">
                <div className="nav-div">
                  <Link to="/account" className="text-link">
                    <span className="nav-span">Account</span>
                  </Link>
                </div>
              </li>
              <li className="nav-element">
                <button className="login-button" onClick={handleLogout}>
                  <span className="nav-span">Logout</span>
                </button>
              </li>
            </React.Fragment>
          ) : (
            <li className="nav-element">
              <button className="login-button" onClick={handleModal}>
                <span className="nav-span">Login</span>
              </button>
            </li>
          )}
        </ul>
      </div>
      <Link to="/cart" className="cart-text-link">
        <div className="cart-wrapper">
          <img src={cart} className="cart-image" />
          <span>CART {cartCount}</span>
        </div>
      </Link>
      <div
        className={mobile ? "open" : "hamburger-icon"}
        onClick={toggleMobileMenu}
      >
        <div className="bar">
          <div className="bar-wrapper">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
        <ul className="mobile-menu">
          <li className="mobile-menu-element">
            <Link to="/menu" className="text-link">
              <div className="mobile-menu-wrapper">
                <span>MENU</span>
                <img src={arrow} className="arrow" />
              </div>
            </Link>
          </li>
          <li className="mobile-menu-element">
            <Link to="/restaurants" className="text-link">
              <div className="mobile-menu-wrapper">
                <span>RESTAURANTS</span>
                <img src={arrow} className="arrow" />
              </div>
            </Link>
          </li>
          <li className="mobile-menu-element">
            <Link to="/login" className="text-link">
              <div className="mobile-menu-wrapper">
                <span>Login</span>
                <img src={arrow} className="arrow" />
              </div>
            </Link>
          </li>
          <li className="mobile-menu-element">
            <div className="mobile-menu-wrapper">
              <span>CART</span>
              <img src={arrow} className="arrow" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
