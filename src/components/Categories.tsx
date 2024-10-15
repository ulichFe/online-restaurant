import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "@/redux/slices/filterSlice";

const categories = ["All", `Beef`, "Chicken", "Fish", "Vegetarian"];

export const Categories = () => {
  const dispatch = useDispatch();

  const categoryId = useSelector(
    (state: any) => state.filterReducer.categoryId
  );

  return (
    <div className="categories">
      <ul className="categories__list">
        {categories.map((category, i) => (
          <li
            key={category}
            onClick={() => dispatch(setCategoryId(i))}
            className={
              categoryId === i
                ? "active categories__list-item"
                : "categories__list-item"
            }
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
