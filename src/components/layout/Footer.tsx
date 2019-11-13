import React from "react";
import { Link } from "react-router-dom";
import { ScrollToTop } from "../../helpers/ScrollToTop";
//import SubscribeEmailFullWidth from "../common/mailchimp/SubscribeEmailFullWidth";

const Footer: React.MemoExoticComponent<() => JSX.Element> = React.memo(() => (
  <>
    {/* <SubscribeEmailFullWidth /> */}
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="footer">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="footer__logo mb-2">
                <Link to="/" onClick={() => ScrollToTop()}>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="code"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    className="svg-inline--fa fa-code fa-w-20 shadow-sm cursor-pointer-scale"
                  >
                    <path
                      fill="currentColor"
                      d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"
                    />
                  </svg>
                </Link>
              </div>
              <p className="mb-2 text-center">
                <strong>
                  Code 4 Coffee - Mateusz Skibicki - {new Date().getFullYear()}
                  <br />
                </strong>
                Code - Coffee - Cats
              </p>
              <div className="small mb-2">
                <Link
                  to="/"
                  className="text-dark cursor-pointer-scale mr-2"
                  onClick={() => ScrollToTop()}
                >
                  <strong>Home</strong>
                </Link>
                |
                <Link
                  to="/author/mateusz-skibicki"
                  className="text-dark cursor-pointer-scale mx-2"
                  onClick={() => ScrollToTop()}
                >
                  <strong>About</strong>
                </Link>
                |
                <Link
                  to="/articles"
                  className="text-dark cursor-pointer-scale ml-2"
                  onClick={() => ScrollToTop()}
                >
                  <strong>Articles</strong>
                </Link>
              </div>
              <div className="d-flex flex-wrap justify-content-start mb-3">
                <a
                  className="btn rounded cursor-pointer-scale border shadow-sm m-1"
                  href={`mailto:skibickiengland@gmail.com`}
                >
                  <i className="far fa-envelope" />
                </a>
                <a
                  className="btn rounded cursor-pointer-scale border shadow-sm m-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/el.papugo/?hl=en"
                >
                  <i className="fab fa-instagram" />
                </a>
                <a
                  className="btn rounded cursor-pointer-scale border shadow-sm m-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/mateuszskibicki"
                >
                  <i className="fab fa-github" />
                </a>
                <a
                  className="btn rounded cursor-pointer-scale border shadow-sm m-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/mateusz-skibicki-web-dev/"
                >
                  <i className="fab fa-linkedin" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
));

export default Footer;
