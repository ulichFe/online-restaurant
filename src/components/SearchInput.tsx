import { useState, useCallback, useRef, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import { setSearchValue } from "@/redux/slices/searchSlice";

export const SearchInput = () => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    setValue("");
    dispatch(setSearchValue(""));
    inputRef.current?.focus();
  };

  return (
    <div className="search">
      <svg
        className="search__img"
        version="1.1"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Guide" />
        <g id="Layer_2">
          <path d="M13.85,13.15l-2.69-2.69c0.74-0.9,1.2-2.03,1.2-3.28C12.37,4.33,10.04,2,7.18,2S2,4.33,2,7.18s2.33,5.18,5.18,5.18   c1.25,0,2.38-0.46,3.28-1.2l2.69,2.69c0.1,0.1,0.23,0.15,0.35,0.15s0.26-0.05,0.35-0.15C14.05,13.66,14.05,13.34,13.85,13.15z    M3,7.18C3,4.88,4.88,3,7.18,3s4.18,1.88,4.18,4.18s-1.88,4.18-4.18,4.18S3,9.49,3,7.18z" />
        </g>
      </svg>

      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className="search__input"
        placeholder="Search..."
        type="text"
      />

      {value && (
        <svg
          onClick={onClickClear}
          className="search__clearImg"
          version="1.1"
          viewBox="0 0 32 32"
          strokeWidth="32px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z"
            fill="#121313"
            id="Close"
          />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </svg>
      )}
    </div>
  );
};
