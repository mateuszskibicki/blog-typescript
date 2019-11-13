import React from "react";
import { Link } from "react-router-dom";

import { ScrollToTop } from "../../helpers/ScrollToTop";

const AboutMe: React.FC = (): JSX.Element => {
  return (
    <div className="container my-5">
      <div className="row ">
        <div className="col-12 col-md-10 m-auto">
          <div className="row justify-content-center align-items-center">
            <div className="col-6 col-sm-6 col-md-3">
              <img
                src="/img/profile-photo.jpg"
                alt="Avatar Mateusz Skibicki Code 4 Coffee"
                className="img-fluid shadow rounded-circle mb-3"
              />
            </div>
            <div className="col-12 col-sm-10 col-md-9">
              <p className="lead">
                Hi! I'm Mateusz Skibicki, I live in Manchester and work as a
                Software Engineer in Musclefood. I work with Full-Stack
                Javascript technologies. I'm a coffee addict, I have 3 cats and
                I love good metalcore music.
                <br />
                More about me:{" "}
                <Link
                  to="/author/mateusz-skibicki"
                  className="text-non-decoration text-dark"
                  onClick={() => ScrollToTop()}
                >
                  <span style={{ fontWeight: 600 }} className="pl-1">
                    'About'
                  </span>{" "}
                </Link>
                {/* <br />
                My projects:{" "}
                <Link
                  to="/projects"
                  className="text-non-decoration text-dark"
                  onClick={() => ScrollToTop()}
                >
                  <span style={{ fontWeight: 600 }} className="pl-1">
                    'Projects'
                  </span>{" "}
                </Link> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
