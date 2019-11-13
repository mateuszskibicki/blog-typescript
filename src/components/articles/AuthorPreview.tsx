import React from "react";
import { Link } from "react-router-dom";
import { ButtonSmallOutlined } from "../common/buttons/ButtonSmallOutlined";
//types
import { ISmallAuthor } from "../../types/author.types";

interface IProps {
  author: ISmallAuthor;
  big?: Boolean;
}

const AuthorPreview: React.FC<IProps> = ({
  author,
  big
}: IProps): JSX.Element | null => {
  if (!author || !author.full_name) return null;

  if (big)
    return (
      <div className="row align-items-center mt-3">
        {author.image_avatar && (
          <div className="col" style={{ maxWidth: "120px" }}>
            <Link to={`/author/${author.uid}`}>
              <img
                src={author.image_avatar.url}
                alt={author.full_name}
                className="img-fluid rounded-circle cursor-pointer-scale shadow-sm"
              />
            </Link>
          </div>
        )}
        <div className="col pl-0">
          <p className="mb-0 text-secondary">Written By</p>
          <Link to={`/author/${author.uid}`} className="text-dark">
            <p className="mb-0">
              <strong>{author.full_name}</strong>
            </p>
          </Link>
          <p className="text-secondary mb-0">{author.short_description}</p>
        </div>
      </div>
    );

  return (
    <div className="mb-1">
      <span className="mr-2 small text-secondary">Author:</span>
      <ButtonSmallOutlined
        text={author.full_name}
        internal
        url={`/author/${author.uid}`}
      />
    </div>
  );
};

export default AuthorPreview;
