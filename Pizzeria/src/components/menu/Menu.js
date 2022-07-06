import "./Menu.css";
import MenuList from "./MenuList";

function Menu({ handleAddToCart, items }) {
  return (
    <div className="menu-div">
      <MenuList handleAddToCart={handleAddToCart} items={items} />
    </div>
  );
}

export default Menu;
