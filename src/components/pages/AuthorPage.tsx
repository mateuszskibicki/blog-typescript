// main
import React, { useEffect, Suspense, memo } from "react";
import { connect } from "react-redux";
// actions
import { getAuthorByUidPrismic } from "../../store/actions/author/authorActions";
import { sliceComponentsHelper } from "../../helpers/slice-helpers/SliceComponentsHelpers";
//types
import { ISEO, IAction } from "../../types/common.types";
import { IAuthorSingle } from "../../types/author.types";
import { TAllSlices } from "../../types/slices.types";
import { ISingleArticle } from "../../types/article.types";
//components
import Loader from "../layout/Loader";
const HeadSEO: React.FunctionComponent<{ SEO: ISEO | null }> = React.lazy(
  (): Promise<any> => import("../layout/HeadSEO")
);
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
  authors: any | null;
  getAuthorByUidPrismic: (uid: string) => IAction;
};

const AuthorPage: React.FunctionComponent<IProps> = memo(
  ({ match, authors, getAuthorByUidPrismic }: IProps): JSX.Element | null => {
    //uid
    const uid: string = match.params.uid;

    async function getUserByUID(): Promise<any> {
      if (!authors[uid]) {
        await getAuthorByUidPrismic(uid);
      }
    }

    useEffect((): void => {
      getUserByUID();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid]);

    //error
    const error: boolean | null =
      authors[uid] && authors[uid].error ? true : null;
    //SEO
    const SEO: ISEO | null =
      authors[uid] && authors[uid].SEO ? authors[uid].SEO : null;
    //author main info -> header
    const author: IAuthorSingle | null =
      authors[uid] && authors[uid].author ? authors[uid].author : null;
    //author content -> slices
    const authorContent: TAllSlices[] | null =
      authors[uid] && authors[uid].author && authors[uid].author.content
        ? authors[uid].author.content
        : null;
    //last articles
    const authorArticles: ISingleArticle[] | null =
      authors[uid] && authors[uid].articles ? authors[uid].articles : null;

    if (error)
      return (
        <Suspense fallback={<Loader />}>
          <ErrorPage />
        </Suspense>
      );

    if (author)
      return (
        <>
          <HeadSEO SEO={SEO} />
          <Suspense fallback={<Loader />}>
            {author && <HeadAboutAuthor author={author} />}
            {authorContent && sliceComponentsHelper(authorContent)}
            {authorArticles && authorArticles.length > 0 && (
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

    return null;
  },
  //memo
  (prevProps, nextProps): boolean => {
    const prevUID = prevProps.match.params.uid;
    const nextUID = nextProps.match.params.uid;
    if (prevUID === nextUID) {
      return true;
    }
    return false;
  }
);

const mapStateToProps = (state: any): any => ({
  authors: state.authors
});
const mapDispatchToProps: {
  getAuthorByUidPrismic: typeof getAuthorByUidPrismic;
} = { getAuthorByUidPrismic };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorPage);
