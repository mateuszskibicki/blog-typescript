import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import NavbarHomeCategories from "./NavbarHomeCategories";
import NavbarSearch from "./NavbarSearch";

const SearchResults = React.lazy(() => import("./SearchResults"));

const Navbar: React.MemoExoticComponent<() => JSX.Element> = React.memo(() => {
  return (
    <nav className="container-fluid mx-0 mb-0 navbar shadow-sm">
      <div className="container p-0 navbar__wrapper flex-nowrap">
        <div className="row justify-content-between align-items-center navbar__logo ml-0">
          <Link to="/">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="code"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              className="svg-inline--fa fa-code fa-w-20 shadow-sm cursor-pointer-scale rounded"
            >
              <path
                fill="currentColor"
                d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"
              />
            </svg>
          </Link>
        </div>
        <h2 className="my-0 ml-4 mr-auto navbar__title d-none d-sm-block">
          Code&
          <br />
          Coffee
        </h2>
        <div className="navbar__right-part d-flex">
          <NavbarSearch />
          <NavbarHomeCategories />
        </div>
        <Suspense fallback={null}>
          <SearchResults />
        </Suspense>
      </div>
    </nav>
  );
});

export default Navbar;
