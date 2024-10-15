import { Link } from "react-router-dom";

import cart from "@/assets/img/cart.png";

export const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <div className="empty-cart__title">Cart Is Empty</div>
      <div className="empty-cart__subtitle">
        to order burgers go to the main page
      </div>
      <div className="empty-cart__img-container">
        <img className="empty-cart__img" src={cart} alt="empty cart" />
      </div>
      <Link to="/">
        <button className="empty-cart__button">Buy Fakeburgers</button>
      </Link>
    </div>
  );
};
