import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QueryString from "qs";

import {
  setFilters,
  selectfilter,
  FilterSliceState,
  fetchBurgers,
  selectBurgerData,
} from "@/redux/slices";
import {
  Categories,
  Sort,
  sortList,
  Burger,
  BurgerSkeleton,
  Pagination,
} from "@/components";
import { useAppDispatch } from "@/redux/store";

export const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isMounted = useRef(false);
  const isSearch = useRef(false);

  const { categoryId, currentPage, sortProperty } = useSelector(selectfilter);
  const { items, status } = useSelector(selectBurgerData);
  const searchValue = useSelector(
    (state: any) => state.searchReducer.searchValue
  );

  const getBurgers = () => {
    const sortBy = sortProperty.sortProperty;
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchBurgers({
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      if (!sort) return;

      dispatch(setFilters(params as unknown as FilterSliceState));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getBurgers();
    }
    isSearch.current = false;
  }, [categoryId, sortProperty.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = QueryString.stringify({
        sortProperty: sortProperty.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sortProperty.sortProperty, categoryId, currentPage]);

  let skeletons = [...new Array(8)].map((_, i) => <BurgerSkeleton key={i} />);

  let burgers = items.map((obj: any) => <Burger key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">All burgers</h2>
        <div className="content__items">
          {status === "loading" ? skeletons : burgers}
        </div>
        <Pagination />
      </div>
    </div>
  );
};
