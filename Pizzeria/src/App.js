import "./App.css";
import NavBar from "./components/navBar/NavBar";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import { Route, Routes } from "react-router-dom";
import Restaurants from "./components/restaurants/Restaurants";
import Login from "./components/login/Login";
import React, { useState, useEffect } from "react";
import Cart from "./components/cart/Cart";
import http from "./services/HttpService";
import config from "./config.json";
import { setAuthorization } from "./services/HttpService";
import Account from "./components/account/Account";
import * as UserServices from "./services/UserServices.js";
function App() {
  const [cartItems, setCartItems] = useState(() => {
    const cartItems = JSON.parse(localStorage.getItem("myCart"));
    return cartItems || [];
  });
  const [items, setItems] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState("");
  const [logIn, setLogIn] = useState(false);
  const [orders, setOrders] = useState([]);

  const handleAddToCart = (item) => {
    if (cartItems.find((e) => e.idProduct === item.idProduct)) {
      const cart = [...cartItems];
      cart.find((e) => e.idProduct === item.idProduct)["count"]++;
      setCartItems(cart);
    } else {
      item["count"] = 1;
      const cart = [...cartItems, item];
      setCartItems(cart);
    }
    var newSum = totalSum;
    newSum += item.price;
    setTotalSum(newSum);
  };
  const handleRemove = (item) => {
    const cart = [...cartItems];
    cart.find((e) => e.idProduct === item.idProduct)["count"]--;
    if (cart.find((e) => e.idProduct === item.idProduct)["count"] < 1) {
      const newCart = cart.filter((e) => e.idProduct !== item.idProduct);
      setCartItems(newCart);
    } else {
      setCartItems(cart);
    }
    var newSum = totalSum;
    newSum -= item.price;
    setTotalSum(newSum);
  };

  function calculateTotalSum() {
    var sum = 0;
    for (const element of cartItems) {
      sum += element["price"] * element["count"];
    }
    console.log(cartItems);
    setTotalSum(sum);
  }
  async function fetchOrders() {
    try {
      const { data } = await http.get(config.apiUrl + "orders");
      setOrders(data);
      console.log("ORDERS");
      console.log(data);
    } catch (ex) {
      console.log("error: " + ex);
    }
  }
  async function fetchData() {
    try {
      const { data: items } = await http.get(config.apiUrl + "products");
      setItems(items);
    } catch (ex) {
      console.log("error: " + ex);
    }
  }
  useEffect(() => {
    calculateTotalSum();
    fetchData();
    fetchUserData();
  }, []);
  useEffect(() => {
    if (logIn) {
      setAuthorization();
      fetchDataAfter();
      fetchOrders();
    }
  }, [logIn]);
  const fetchUserData = async () => {
    const dataUser = localStorage.getItem("userData");
    if (dataUser) {
      setUser(await UserServices.getCurrentUser());
      setLogIn(true);
    }
  };
  const fetchDataAfter = async () => {
    setUserData(await UserServices.getUserData());
  };

  /*useEffect(() => {
    const interval = setInterval(() => {
      console.log("REFRESH TOKEN");
      console.log(new Date(user["exp"]) * 1000 - new Date());
      if (new Date(user["exp"]) * 1000 - new Date() < 0) {
        try {
          console.log("AKTUALIZACJA REF");
          UserServices.refreshToken();
          fetchUserData();
        } catch (error) {
          console.log(error);
        }
      }
      return () => clearInterval(interval);
    }, 5000);
  }, []);
*/
  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cartItems));
    if (cartItems.length > 0) {
      calculateTotalSum();
    }
  }, [cartItems]);

  const handleModal = (bool) => {
    setModal(bool);
  };

  const handleLogIn = () => {
    setLogIn(true);
    fetchUserData();
  };
  const handleLogout = () => {
    setLogIn(false);
    UserServices.logout();
    setUser({});
  };
  const clearCart = () => {
    setCartItems([]);
    setTotalSum(0);
    fetchOrders();
  };

  return (
    <div className="container">
      <NavBar
        cartCount={totalSum}
        handleModal={handleModal}
        user={user}
        handleLogout={handleLogout}
      />
      {modal && (
        <Login handleCloseModal={handleModal} userLogIn={handleLogIn} />
      )}
      <Routes>
        <Route path="/" element={<Content />} />
        <Route
          path="/menu"
          element={<Menu handleAddToCart={handleAddToCart} items={items} />}
        />
        <Route path="/restaurants" element={<Restaurants />} />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              handleAddToCart={handleAddToCart}
              handleRemove={handleRemove}
              totalSum={totalSum}
              address={userData}
              clearCart={clearCart}
            />
          }
        />
        {logIn && (
          <React.Fragment>
            <Route
              path="/account/"
              element={
                <Account user={user} userData={userData} orders={orders} />
              }
            />
            <Route
              path="/account/:tab"
              element={
                <Account user={user} userData={userData} orders={orders} />
              }
            />
          </React.Fragment>
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
