import React from "react";
import { Link } from "react-router-dom";

import { ISingleArticle } from "../../types/article.types";

interface IProps {
  article: ISingleArticle;
  onExitSearch: React.MouseEventHandler;
}

export const SearchSingleResult = ({
  article: { uid, date, title, xs_img },
  onExitSearch
}: IProps): JSX.Element | null => {
  if (!uid || !xs_img || !xs_img.url) return null;

  return (
    <div className="col-12 mb-2 navbar__search-results--single">
      <div className="row justify-content-center align-items-center">
        <div className="col-2 p-0">
          <Link to={`/articles/${uid}`}>
            <img
              src={xs_img.url}
              alt={xs_img.alt ? xs_img.alt : ""}
              className="img-fluid rounded-circle shadow-sm cursor-pointer-scale"
              onClick={onExitSearch}
            />
          </Link>
        </div>
        <div className="col-9 px-2">
          <p className="mb-0 small">
            <strong>{title}</strong>
          </p>
          <p className="small text-secondary mb-0">{date}</p>
        </div>
        <div className="col-1 p-0">
          <Link to={`/articles/${uid}`}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="arrow-alt-circle-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="svg-inline--fa fa-arrow-alt-circle-right fa-w-16 rounded-circle shadow-sm"
              style={{ width: "20px" }}
              onClick={onExitSearch}
            >
              <path
                fill="currentColor"
                d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="dropdown-divider" />
    </div>
  );
};

// SearchSingleResult.propTypes = {
//   onExitSearch: PropTypes.func,
//   article: PropTypes.shape({
//     uid: PropTypes.string,
//     date: PropTypes.string,
//     series: PropTypes.string,
//     short_description: PropTypes.string,
//     tags: PropTypes.string,
//     categories: PropTypes.string,
//     title: PropTypes.string,
//     small_img: PropTypes.shape({
//       url: PropTypes.string,
//       alt: PropTypes.string
//     }),
//     xs_img: PropTypes.shape({
//       url: PropTypes.string,
//       alt: PropTypes.string
//     }),
//     author: PropTypes.shape({
//       full_name: PropTypes.string,
//       image_avatar: PropTypes.shape({
//         url: PropTypes.string,
//         alt: PropTypes.string
//       }),
//       short_description: PropTypes.string,
//       uid: PropTypes.string
//     })
//   })
// };
