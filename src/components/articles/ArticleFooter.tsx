import React from "react";
import CategoriesList from "./CategoriesList";
import TagsList from "./TagsList";
import AuthorPreview from "./AuthorPreview";

//@ts-ignore
import { FacebookProvider, Comments } from "react-facebook";

import { IArticleFooter } from "../../types/article.types";

const ArticleFooter: React.FC<IArticleFooter> = ({
  categories,
  tags,
  author
}: IArticleFooter) => {
  return (
    <div className="container my-3 mx-auto">
      <hr />
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-sm-10 col-md-8 my-4 mx-auto">
          {categories && <CategoriesList categories={categories} />}
          {tags && <TagsList tags={tags} />}
          {author && <AuthorPreview author={author} big={true} />}
        </div>
      </div>
      <hr />
      <div className="my-4 mx-auto text-center">
        <FacebookProvider appId="495288911038281">
          <Comments href="http://localhost:3000/articles/is-this-possible-to-become-a-full-time-dev-for-1001" />
        </FacebookProvider>
      </div>
    </div>
  );
};

export default ArticleFooter;
