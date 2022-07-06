import "./Cart.css";
import CartList from "./CartList";
import http from "../../services/HttpService";
import config from "../../config.json";

const Cart = ({
  cartItems,
  handleAddToCart,
  handleRemove,
  totalSum,
  address,
  clearCart,
}) => {
  const sendOrder = async () => {
    var products = [];

    cartItems.forEach((item) => {
      products.push(item.idProduct, item.count);
    });

    const req = JSON.stringify({
      address: address,
      productCount: products,
    });
    try {
      const response = await http.post(config.apiUrl + "order", req, {
        headers: {
          "Content-type": "application/json",
        },
      });
    } catch (error) {
      return {};
    }
  };
  const wrappOrder = () => {
    sendOrder();
    clearCart();
  };

  return (
    <div className="main-cart">
      <div className="cart-title-wrapper">
        <span>Wybrane produkty</span>
      </div>
      <div className="cart-items-wrapper">
        <CartList
          cartItems={cartItems}
          handleAddToCart={handleAddToCart}
          handleRemove={handleRemove}
        />
      </div>
      {/*
        <div className="address-wrapper">
          <span>Address</span>
        </div>
        */}

      <div className="summary-wrapper">
        <span>Summary {totalSum} ZŁ</span>
        <div className="order-button-wrapper">
          <button className="login" onClick={wrappOrder}>
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
