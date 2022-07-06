import "./Menu.css";
import { useEffect } from "react";

const MenuList = ({ handleAddToCart, items }) => {
  return (
    <div className="list-wrapper">
      <ul className="menu-list">
        {items.map((item) => (
          <li className="list-element-menu" key={item.idProduct}>
            <img
              src={`data:image/jpg;base64,${item.image}`}
              alt={item.name}
              className="image-wrapper"
            />
            <div className="menu-element">
              <span className="menu-title">{item.name}</span>
              <p>{item.description}</p>
              <div className="cart-button-wrapper">
                <span className="price">{item.price}</span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="cart-add-button"
                >
                  Koszyk
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
