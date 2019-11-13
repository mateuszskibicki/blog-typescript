import React from "react";
import { SingleArticlePreview } from "./SingleArticlePreview";

import { ISingleArticle } from "../../types/article.types";

interface IProps {
  articles: ISingleArticle[];
}

const ArticlesList: React.FC<IProps> = ({
  articles
}: IProps): JSX.Element | null => {
  if (!articles) return null;
  return (
    <div className="container">
      <div className="row justify-content-center">
        {articles.map((article: ISingleArticle) => (
          <SingleArticlePreview article={article} key={article.uid} />
        ))}
      </div>
    </div>
  );
};

export default ArticlesList;
