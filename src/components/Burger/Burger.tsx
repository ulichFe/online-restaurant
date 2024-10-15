import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  CartItem,
  addItem,
  selectCartItemById,
} from "@/redux/slices/cartSlice";

interface BurgerProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
}

const typeNames = ["with onion", "without onion"];
const images = [
  require("@/assets/img/onion_rings.png"),
  require("@/assets/img/without_onion_rings.png"),
];

export const Burger = ({ id, title, price, imageUrl, types }: BurgerProps) => {
  const [activeType, setActiveType] = useState(0);

  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));

  const addedCount = cartItem ? cartItem.count : 0;

  const item: CartItem = {
    id,
    title,
    price,
    imageUrl,
    type: typeNames[activeType],
    count: 0,
  };

  return (
    <div className="burger">
      <Link to={`/burger/${id}`} className="burger__link">
        <div className="burger__img-container">
          <img className="burger__img" src={imageUrl} alt="Burger" />
        </div>

        <h4 className="burger__title">{title}</h4>
      </Link>

      <ul className="burger__selector selector">
        {types.map((type) => (
          <li
            key={type}
            onClick={() => setActiveType(type)}
            className={
              activeType === type ? "active selector__item" : "selector__item"
            }
          >
            <p className="selector__name">{typeNames[type]}</p>
            <img
              className="selector__img"
              src={images[type]}
              alt="onion rings"
            />
          </li>
        ))}
      </ul>

      <div className="burger__bottom">
        <div className="burger__price">{price} $</div>

        <button
          onClick={() => dispatch(addItem(item))}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            ></path>
          </svg>

          <span>Add</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};
