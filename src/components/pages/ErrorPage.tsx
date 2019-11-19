import React from "react";
import { Helmet } from "react-helmet-async";
import authors, {
  getAuthorByUID,
  setAuthorErrorTrue
} from "../../store/reducers/authorSlice";

const ErrorPage: React.MemoExoticComponent<() => JSX.Element> = React.memo(
  () => {
    console.log(authors);
    console.log(getAuthorByUID);
    console.log(setAuthorErrorTrue);
    return (
      <>
        <Helmet>
          <title>Coffee4Code - 404</title>
          <meta
            name="description"
            content={"404 page - Coffee4Code - Page doesn't exist."}
          />
        </Helmet>
        <div className="container my-3">
          <h1 className="display-4 text-center">ERROR #404</h1>
          <div
            style={{ maxWidth: "120px", maxHeight: "120px" }}
            className="mx-auto my-4"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="mug-hot"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="svg-inline--fa fa-mug-hot fa-w-16"
            >
              <path
                fill="currentColor"
                d="M127.1 146.5c1.3 7.7 8 13.5 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18-3.8-28.2-16.4-54.2-36.6-74.7-14.4-14.7-23.6-33.3-26.4-53.5C111.8 5.9 105 0 96.8 0H80.4C70.6 0 63 8.5 64.1 18c3.9 31.9 18 61.3 40.6 84.4 12 12.2 19.7 27.5 22.4 44.1zm112 0c1.3 7.7 8 13.5 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18-3.8-28.2-16.4-54.2-36.6-74.7-14.4-14.7-23.6-33.3-26.4-53.5C223.8 5.9 217 0 208.8 0h-16.4c-9.8 0-17.5 8.5-16.3 18 3.9 31.9 18 61.3 40.6 84.4 12 12.2 19.7 27.5 22.4 44.1zM400 192H32c-17.7 0-32 14.3-32 32v192c0 53 43 96 96 96h192c53 0 96-43 96-96h16c61.8 0 112-50.2 112-112s-50.2-112-112-112zm0 160h-16v-96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48z"
                className=""
              />
            </svg>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 mb-4">
              <p className="lead">
                Whoops... You found an error. Probably this is just unexisting
                page. If you think this is something bigger and website is
                broken, please contact me:{" "}
                <a
                  href="mailto:skibickiengland@gmail.com"
                  className="text-dark"
                >
                  <strong>skibickiengland@gmail.com</strong>{" "}
                  <i className="far fa-envelope ml-1" />{" "}
                </a>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default ErrorPage;
