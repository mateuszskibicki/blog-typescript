import React from "react";
import { Link } from "react-router-dom";
import { ScrollToTop } from "../../helpers/ScrollToTop";
import CategoriesList from "./CategoriesList";
import TagsList from "./TagsList";
//import SeriesList from "./SeriesList";
import AuthorPreview from "./AuthorPreview";
import { ISingleArticle } from "../../types/article.types";

interface IProps {
  article: ISingleArticle;
}

export const SingleArticlePreview: React.FC<IProps> = ({
  article: {
    uid,
    date,
    //series,
    categories,
    short_description,
    tags,
    title,
    small_img,
    author
  }
}: IProps): JSX.Element => {
  return (
    <div className="col-12 col-xs-8 col-sm-6 col-lg-4 p-0 mb-4">
      <div className="m-2 d-flex flex-column align-items-stretch shadow rounded">
        {small_img && small_img.url && (
          <Link to={`/articles/${uid}`} onClick={() => ScrollToTop()}>
            <img
              src={small_img.url}
              alt={small_img.alt ? small_img.alt : ""}
              className="img-fluid cursor-pointer rounded-top"
            />
          </Link>
        )}
        <div className="py-2 px-3 d-flex flex-column h-100">
          {date && (
            <p className="mb-1 small text-secondary text-right">
              <b>{date}</b>
            </p>
          )}
          {title && (
            <Link
              to={`/articles/${uid}`}
              className="text-non-decoration"
              onClick={() => ScrollToTop()}
            >
              <h4 className="mb-1 text-dark cursor-pointer">
                <strong>{title}</strong>
              </h4>
            </Link>
          )}
          {short_description && (
            <p className="mb-1 text-secondary">{short_description}</p>
          )}
          {author && author.uid && <AuthorPreview author={author} />}
          {categories && <CategoriesList categories={categories} />}
          {/* {series && <SeriesList series={series} />} */}
          {tags && <TagsList tags={tags} />}
          <div className="mt-2 mb-2 text-right">
            <Link to={`/articles/${uid}`} onClick={() => ScrollToTop()}>
              <button className="btn btn-main shadow-sm">Read more...</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
