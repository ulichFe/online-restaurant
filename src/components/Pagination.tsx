import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

import { setCurrentPage } from "@/redux/slices/filterSlice";

export const Pagination = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state: any) => state.filterReducer.currentPage
  );

  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      forcePage={currentPage - 1}
      pageRangeDisplayed={3}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};
