import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectSort, setSortState } from "@/redux/slices/filterSlice";

export interface SortListItem {
  name: string;
  sortProperty: "rating" | "title" | "price";
}

export const sortList: SortListItem[] = [
  { name: "popularity", sortProperty: "rating" },
  { name: "price", sortProperty: "price" },
  { name: "alphabetically", sortProperty: "title" },
];

export const Sort = () => {
  const [hide, setHide] = useState<boolean>(false);

  const sortRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const sortState = useSelector(selectSort);

  const onClickSort = (obj: SortListItem) => {
    dispatch(setSortState(obj));
    setHide(!hide);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[];
      };
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setHide(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          className="sort__img"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          ></path>
        </svg>
        <p className="sort__title">
          <b>Sort by:</b>
        </p>
        <span className="sort__type" onClick={() => setHide(!hide)}>
          {sortState.name}
        </span>
      </div>
      {hide && (
        <div className="sort__popup">
          <ul className="popup__list list">
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => {
                  onClickSort(obj);
                }}
                className={
                  sortState.sortProperty === obj.sortProperty
                    ? "active list__item"
                    : "list__item"
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
