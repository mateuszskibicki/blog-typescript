import React from "react";
import AuthorPreview from "./AuthorPreview";

import { IArticleHeader } from "../../types/article.types";

const ArticleHeader: React.FC<IArticleHeader> = ({
  title,
  short_description,
  date,
  big_img,
  author
}: IArticleHeader): JSX.Element => (
  <div className="container mb-3 mx-auto">
    <div className="row justify-content-center align-items-center">
      <div className="col-12 col-sm-10 col-md-8 mt-4 mb-4 mx-auto">
        {title && <h1 className="mb-2">{title}</h1>}
        {date && <p className="text-secondary mb-2">{date}</p>}
        {short_description && (
          <p className="text-secondary mb-2">{short_description}</p>
        )}
        {author && <AuthorPreview author={author} />}
      </div>
      {big_img && (
        <div className="col-12 px-0 mb-4">
          <img
            src={big_img.url}
            alt={big_img.alt ? big_img.alt : "Code4Coffee Article Image"}
            className="img-fluid m-auto shadow"
          />
        </div>
      )}
    </div>
  </div>
);

export default ArticleHeader;
