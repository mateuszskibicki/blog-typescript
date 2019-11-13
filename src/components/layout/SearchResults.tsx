import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchText } from "../../store/actions/search/searchActions";
import { SearchSingleResult } from "./SearchSingleResult";

import { ISearchResults } from "../../types/search.types";
import { ISingleArticle } from "../../types/article.types";

const SearchResults: any = ({
  articles,
  error,
  loading,
  searchText,
  setSearchText
}: ISearchResults) => {
  const onExitSearch: React.MouseEventHandler = (): void => {
    setSearchText("");
  };

  if (!searchText || searchText.trim().length === 0) return null;
  return (
    <div className="navbar__search-results shadow rounded">
      {loading && (
        <div className="py-4 w-100 text-center">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="spinner"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="svg-inline--fa fa-spinner fa-w-16 fa-spin"
          >
            <path
              fill="currentColor"
              d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"
            />
          </svg>
        </div>
      )}
      {!loading && (
        <div className="container mb-1">
          <div className="row align-items-center">
            <div className="col-6">
              <p className="small mb-0">
                <strong>{articles.length} results: </strong>
              </p>
            </div>
            <div className="col-6 pr-0">
              <div className="ml-auto navbar__search-results--close-icon d-flex justify-content-end">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="times"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 352 512"
                  className="svg-inline--fa fa-times fa-w-11 shadow-sm"
                  onClick={onExitSearch}
                >
                  <path
                    fill="currentColor"
                    d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="dropdown-divider" />
        </div>
      )}
      {error && (
        <p className="lead text-center">
          Ups, there was an error, please try again or contact me.
        </p>
      )}
      {!loading && !error && articles && articles.length > 0 && (
        <div className="container">
          <div className="row">
            {articles.map((article: ISingleArticle) => (
              <SearchSingleResult
                article={article}
                key={article.uid}
                onExitSearch={onExitSearch}
              />
            ))}
            <div className="col-12 text-center">
              <Link to={`/articles?searchText=${searchText}`}>
                <p className="btn btn-secondary" onClick={onExitSearch}>
                  Find all - ' <strong>{searchText}</strong> '
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
      {!loading && !error && articles && articles.length === 0 && (
        <div className="col-12 text-center my-3">
          <p className="lead m-0">No results... Try again!</p>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="laugh-wink"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
            className="svg-inline--fa fa-laugh-wink fa-w-16 rounded-circle shadow-sm primary-color"
            style={{ width: "40px" }}
          >
            <path
              fill="currentColor"
              d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm141.4 389.4c-37.8 37.8-88 58.6-141.4 58.6s-103.6-20.8-141.4-58.6C68.8 359.6 48 309.4 48 256s20.8-103.6 58.6-141.4C144.4 76.8 194.6 56 248 56s103.6 20.8 141.4 58.6c37.8 37.8 58.6 88 58.6 141.4s-20.8 103.6-58.6 141.4zM328 164c-25.7 0-55.9 16.9-59.9 42.1-1.7 11.2 11.5 18.2 19.8 10.8l9.5-8.5c14.8-13.2 46.2-13.2 61 0l9.5 8.5c8.5 7.4 21.6.3 19.8-10.8-3.8-25.2-34-42.1-59.7-42.1zm-160 60c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm194.4 64H133.6c-8.2 0-14.5 7-13.5 15 7.5 59.2 58.9 105 121.1 105h13.6c62.2 0 113.6-45.8 121.1-105 1-8-5.3-15-13.5-15z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ search }: any) => search;
const mapDispatchToProps = { setSearchText };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
