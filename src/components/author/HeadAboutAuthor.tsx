import React from "react";
import { IAuthorSingle } from "../../types/author.types";

interface IProps {
  author: IAuthorSingle;
}

const HeadAboutAuthor: React.FC<IProps> = ({
  author: {
    short_description,
    full_name,
    email,
    instagram,
    facebook,
    github,
    linkedin,
    image
  }
}: IProps): JSX.Element => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-sm-9 col-md-8 col-xl-6">
          <h3>{full_name}</h3>
          <p className="lead">{short_description}</p>
          <div className="d-flex flex-wrap justify-content-start">
            {email && (
              <a
                className="btn rounded border shadow-sm m-1"
                href={`mailto:${email}`}
              >
                <i className="far fa-envelope" />
              </a>
            )}
            {instagram && (
              <a
                className="btn rounded border shadow-sm m-1"
                target="_blank"
                rel="noopener noreferrer"
                href={instagram}
              >
                <i className="fab fa-instagram" />
              </a>
            )}
            {facebook && (
              <a
                className="btn rounded border shadow-sm m-1"
                target="_blank"
                rel="noopener noreferrer"
                href={facebook}
              >
                <i className="fab fa-facebook" />
              </a>
            )}
            {github && (
              <a
                className="btn rounded border shadow-sm m-1"
                target="_blank"
                rel="noopener noreferrer"
                href={github}
              >
                <i className="fab fa-github" />
              </a>
            )}
            {linkedin && (
              <a
                className="btn rounded border shadow-sm m-1"
                target="_blank"
                rel="noopener noreferrer"
                href={linkedin}
              >
                <i className="fab fa-linkedin" />
              </a>
            )}
          </div>
        </div>
        {image && (
          <div className="col-7 col-sm-3 col-md-4 col-xl-3 mt-3 mt-sm-0">
            <img
              src={image.url}
              alt={image.alt ? image.alt : ""}
              className="img-fluid shadow rounded-circle"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeadAboutAuthor;
