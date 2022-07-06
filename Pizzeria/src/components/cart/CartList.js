import "./CartList.css";
import minus from "../../images/minus.svg";
import plus from "../../images/plus.svg";

const CartList = ({ cartItems, handleAddToCart, handleRemove }) => {
  return (
    <ul>
      {cartItems.map((item) => (
        <li key={item.idProduct} className="cart-list">
          <div className="title-sum-wrapper">
            <span className="item-title"> {item.name}</span>
            <span className="item-sum">{item.price * item.count} ZŁ</span>
          </div>

          <div className="count-button-wrapper">
            <button onClick={() => handleRemove(item)}>
              <div className="count-minus">
                <img src={minus}></img>
              </div>
            </button>
            {item.count}
            <button onClick={() => handleAddToCart(item)}>
              <div className="count-plus">
                <img src={plus}></img>
              </div>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
