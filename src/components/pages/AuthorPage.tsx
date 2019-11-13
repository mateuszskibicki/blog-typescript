// main
import React, { Suspense, memo } from "react";
import { useGetAuthorByUidPrismic } from "../../store/actions/author/useAuthorActions";
import { sliceComponentsHelper } from "../../helpers/slice-helpers/SliceComponentsHelpers";

import { IAuthorSingle } from "../../types/author.types";
import { TAllSlices } from "../../types/slices.types";
import { ISingleArticle } from "../../types/article.types";
//components
import Loader from "../layout/Loader";
import HeadSEO from "../layout/HeadSEO";

const ErrorPage: React.StatelessComponent = React.lazy(
  (): Promise<any> => import("./ErrorPage")
);
const HeadAboutAuthor: React.FC<{ author: IAuthorSingle }> = React.lazy(
  (): Promise<any> => import("../author/HeadAboutAuthor")
);
const ArticlesList: React.FC<{ articles: ISingleArticle[] }> = React.lazy(
  (): Promise<any> => import("../articles/ArticlesList")
);

type IProps = {
  match: any;
};

const AuthorPage: React.FunctionComponent<IProps> = ({
  match
}: IProps): JSX.Element => {
  // get data
  const [authorData, loading] = useGetAuthorByUidPrismic(match.params.uid);

  // check if loading
  if (!authorData || loading.loading) return <Loader />;

  // get single author data
  const { author, articles, error, SEO } = authorData;

  // author content -> slices
  const authorContent: TAllSlices[] | null =
    author && author.content ? author.content : null;

  // last articles
  const authorArticles: ISingleArticle[] | null = articles ? articles : null;

  if (error || !author)
    return (
      <Suspense fallback={<Loader />}>
        <ErrorPage />
      </Suspense>
    );

  return (
    <>
      <HeadSEO SEO={SEO} />
      <Suspense fallback={<Loader />}>
        {author && <HeadAboutAuthor author={author} />}
        {authorContent && sliceComponentsHelper(authorContent)}
        {authorArticles &&
          authorArticles !== null &&
          authorArticles.length > 0 && (
            <>
              <div className="container text-center m-auto">
                <hr />
                <h1>Last 3 articles:</h1>
              </div>
              <ArticlesList articles={authorArticles} />
            </>
          )}
      </Suspense>
    </>
  );
};

const isEqual = (prevProps: any, nextProps: any) => {
  const prevUID = prevProps.match.params.uid;
  const nextUID = nextProps.match.params.uid;
  if (prevUID === nextUID) {
    return true;
  }
  return false;
};

export default memo(AuthorPage, isEqual);
