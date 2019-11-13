import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ScrollToTop } from "../../helpers/ScrollToTop";

const IconsFloating: React.FC = (): JSX.Element => {
  const [isVisible, setIsVisible]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);

  const handleMobileClick: React.MouseEventHandler = (): void => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* ONLY DESKTOP FROM HERE */}
      <div className="floating-icons d-none d-md-flex flex-column">
        <Link
          className="btn rounded cursor-pointer-scale border mb-1 shadow-sm"
          to={`/author/mateusz-skibicki`}
          onClick={() => ScrollToTop()}
        >
          <i className="far fa-address-card" />
        </Link>
        <a
          className="btn rounded cursor-pointer-scale border mb-1 shadow-sm"
          href={`mailto:skibickiengland@gmail.com`}
        >
          <i className="far fa-envelope" />
        </a>
        <a
          className="btn rounded cursor-pointer-scale border mb-1 shadow-sm"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/el.papugo/?hl=en"
        >
          <i className="fab fa-instagram" />
        </a>
        <a
          className="btn rounded cursor-pointer-scale border mb-1 shadow-sm"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/mateuszskibicki"
        >
          <i className="fab fa-github" />
        </a>
        <a
          className="btn rounded cursor-pointer-scale border shadow-sm"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/mateusz-skibicki-web-dev/"
        >
          <i className="fab fa-linkedin" />
        </a>
      </div>
      {/* ONLY MOBILE FROM HERE */}
      <div
        className="mr-3 mb-3 floating-icons-mobile d-flex flex-column d-md-none"
        style={{ bottom: "0" }}
      >
        <button
          className="btn btn-main rounded cursor-pointer-scale shadow-sm"
          onClick={handleMobileClick}
        >
          <i className={`fas fa-arrow-down ${!isVisible && "d-none"}`} />
          <i className={`far fa-address-book ${isVisible && "d-none"}`} />
        </button>
        {isVisible && (
          <>
            <Link
              className="btn rounded cursor-pointer-scale border my-1 shadow-sm"
              to={`/author/mateusz-skibicki`}
              onClick={() => ScrollToTop()}
            >
              <i className="far fa-address-card" />
            </Link>
            <a
              className="btn rounded cursor-pointer-scale border mb-1 shadow-sm"
              href={`mailto:skibickiengland@gmail.com`}
            >
              <i className="far fa-envelope" />
            </a>
            <a
              className="btn rounded cursor-pointer-scale border mb-1 shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/el.papugo/?hl=en"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              className="btn rounded cursor-pointer-scale border mb-1 shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/mateuszskibicki"
            >
              <i className="fab fa-github" />
            </a>
            <a
              className="btn rounded cursor-pointer-scale border shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/mateusz-skibicki-web-dev/"
            >
              <i className="fab fa-linkedin" />
            </a>
          </>
        )}
      </div>
    </>
  );
};

export default IconsFloating;
