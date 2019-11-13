// main
import React, { useEffect, Suspense, memo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// actions
import { getAllArticles } from "../../store/actions/articles/articlesActions";
//types
import { IArticlesPage, ISingleArticle } from "../../types/article.types";
// components
import Loader from "../layout/Loader";
import AboutMe from "../homepage/AboutMe";
const ErrorPage: React.FunctionComponent<{}> = React.lazy(
  (): Promise<any> => import("./ErrorPage")
);
const ArticlesList: React.FunctionComponent<{
  articles: ISingleArticle[];
}> = React.lazy((): Promise<any> => import("../articles/ArticlesList"));

type IProps = {
  articles: IArticlesPage;
  getAllArticles: any;
};

const Homepage: React.FC<IProps | any> = memo(
  ({ articles, getAllArticles }: IProps | any): JSX.Element => {
    async function getAllAerticlesByPage(): Promise<any> {
      if (!articles["1"] || articles.category || articles.searchText) {
        await getAllArticles({ page: 1 });
      }
    }

    useEffect((): void => {
      getAllAerticlesByPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const error: boolean = articles.error;
    const articlesArray: ISingleArticle[] = articles["1"];

    if (error)
      return (
        <Suspense fallback={<Loader />}>
          <ErrorPage />
        </Suspense>
      );

    return (
      <>
        <AboutMe />
        <Suspense fallback={<Loader />}>
          {articlesArray && articlesArray.length > 0 && (
            <>
              <div className="container text-center m-auto">
                <hr />
                <h1>Last 3 articles:</h1>
              </div>
              <ArticlesList articles={articlesArray.slice(0, 3)} />
              <div className="container my-3 text-center">
                <Link to="/articles" className="btn btn-lg btn-main">
                  All articles
                </Link>
              </div>
            </>
          )}
        </Suspense>
      </>
    );
  }
);

const mapStateToProps = ({ articles }: any) => ({ articles });
const mapDispatchToProps = { getAllArticles };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
