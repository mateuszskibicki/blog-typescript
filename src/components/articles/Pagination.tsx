import React from "react";
//@ts-ignore
import Pagination from "react-js-pagination";
import { withRouter } from "react-router-dom";

interface IProps {
  activePage: string | number | null;
  itemsCountPerPage: number;
  totalItemsCount: number;
  pageRangeDisplayed: number;
  history: any;
}

const PaginationComponent = (props: IProps) => {
  const {
    activePage,
    itemsCountPerPage,
    totalItemsCount,
    pageRangeDisplayed
  } = props;

  const onPageChange = (page: number): void => {
    props.history.push(`/articles?page=${page}`);
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-12">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};
//@ts-ignore
export default withRouter(PaginationComponent);
