// main
import React, { useEffect, Suspense, memo } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
// actions
import { getAllArticles } from "../../store/actions/articles/articlesActions";
//types
import { ISEO } from "../../types/common.types";
import { IArticlesPage, ISingleArticle } from "../../types/article.types";
// components
import Loader from "../layout/Loader";
const HeadSEO: React.FunctionComponent<{ SEO: ISEO | null }> = React.lazy(
  (): Promise<any> => import("../layout/HeadSEO")
);
const ErrorPage: React.FunctionComponent<{}> = React.lazy(
  (): Promise<any> => import("./ErrorPage")
);
const CategorySearch: React.FunctionComponent<{
  searchText: string | null;
  category: string | null;
}> = React.lazy((): Promise<any> => import("../articles/CategorySearch"));
const ArticlesList: React.FunctionComponent<{
  articles: ISingleArticle[];
}> = React.lazy((): Promise<any> => import("../articles/ArticlesList"));
// const Pagination: React.FunctionComponent<{
//   activePage: string | number | null;
//   itemsCountPerPage: number;
//   totalItemsCount: number;
//   pageRangeDisplayed: number;
// }> = React.lazy((): Promise<any> => import("../articles/Pagination"));

type IProps = {
  location: any;
  articles: IArticlesPage;
  getAllArticles: any;
};

interface IParsed {
  page: string;
  category: string | null;
  searchText: string | null;
}

const AllArticlesPage: React.FC<IProps | any> = memo(
  ({ articles, location, getAllArticles }: IProps | any): JSX.Element => {
    const parsed: any = queryString.parse(location.search);
    const params: IParsed = {
      page: parsed.page || "1",
      category: parsed.category || null,
      searchText: parsed.searchText || null
    };

    async function getAllAerticlesByPage(): Promise<any> {
      if (
        params.category !== articles.category ||
        params.searchText !== articles.searchText
      ) {
        return await getAllArticles({ ...params });
      }

      if (articles && articles[params.page]) {
        return;
      }

      await getAllArticles({ ...params });
    }

    useEffect((): void => {
      getAllAerticlesByPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.page, params.category, params.searchText]);

    const error: boolean = articles.error;
    // const currentPage: string | null = articles.currentPage;
    // const totalPages: number | null = articles.totalPages;
    const category: string | null = articles.category;
    const searchText: string | null = articles.searchText;
    const SEO: ISEO | null = articles.SEO;
    const articlesArray: ISingleArticle[] = articles[params.page];

    if (error)
      return (
        <Suspense fallback={<Loader />}>
          <ErrorPage />
        </Suspense>
      );

    return (
      <>
        <HeadSEO SEO={SEO} />
        <Suspense fallback={<Loader />}>
          <div className="my-5">
            {(searchText || category) && (
              <CategorySearch searchText={searchText} category={category} />
            )}
            {articlesArray && articlesArray.length > 0 && (
              <ArticlesList articles={articlesArray} />
            )}
            {/* {totalPages && totalPages > 1 && currentPage && (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={1}
                totalItemsCount={3}
                pageRangeDisplayed={3}
              />
            )} */}
          </div>
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
)(AllArticlesPage);
