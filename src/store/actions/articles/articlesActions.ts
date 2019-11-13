import Prismic from "prismic-javascript";
import {
  GET_ALL_ARTICLES,
  GET_ALL_ARTICLES_INITIAL_STATE,
  SET_ERROR_ALL_ARTICLES_FALSE,
  SET_ERROR_ALL_ARTICLES_TRUE
} from "../types";
// loading
import { setLoadingStart, setLoadingStop } from "../common/loadingActions";
// helpers
import {
  articlesListHelper,
  allArticlesPageSEOHelper
} from "../../../helpers/articles/ArticlesHelpers";
//types
import { Dispatch } from "react";
import { ISEO, IPrismicConnection } from "../../../types/common.types";

// Set articles error to true
export const setArticlesErrorToTrue = () => (
  dispatch: Dispatch<{ type: string }>
): void => {
  dispatch({ type: SET_ERROR_ALL_ARTICLES_TRUE });
};

// Set articles error to false
export const setArticlesErrorToFalse = () => (
  dispatch: Dispatch<{ type: string }>
): void => {
  dispatch({ type: SET_ERROR_ALL_ARTICLES_FALSE });
};

interface IgetAllArticles {
  page: string;
  category: string | null;
  searchText: string | null;
  SEO: ISEO | null;
}

// Get afticles data by page/tag/search_text/category from prismic CMS
export const getAllArticles = ({
  page = "1",
  category = null,
  searchText = null,
  SEO = null
}: IgetAllArticles) => async (dispatch: any): Promise<any> => {
  try {
    // Start loading
    dispatch(setLoadingStart());

    if (!Number(page)) {
      dispatch({ type: SET_ERROR_ALL_ARTICLES_TRUE });
      dispatch(setLoadingStop());
      return;
    }

    //Check if page is correct
    const pageNumber: string = !Number(page) ? "1" : page;

    //Prismic connection
    const PrismicEndpoint: string | null =
      process.env.REACT_APP_PRISMIC_API_ENDPOINT || null;
    const PrismicToken: string | null =
      process.env.REACT_APP_PRISMIC_API_TOKEN || null;

    //If no settings -> return error
    if (!PrismicEndpoint || !PrismicToken) {
      dispatch({ type: SET_ERROR_ALL_ARTICLES_TRUE });
      dispatch(setLoadingStop());
      return;
    }

    const prismicConnection: IPrismicConnection = await Prismic.getApi(
      PrismicEndpoint,
      {
        accessToken: PrismicToken
      }
    );

    //Empty data at the very beginning
    let data: any = null;
    let SEOdata: null | ISEO = SEO || null;

    //Articles query
    if (!category && !searchText) {
      // all articles
      data = await getAllArticlesPrismicQuery({
        prismicConnection,
        page: pageNumber
      });
    } else if (category && !searchText) {
      // all articles based on category
      data = await getAllArticlesByCategoryPrismicQuery({
        prismicConnection,
        page: pageNumber,
        category
      });
    } else if (!category && searchText) {
      // all articles based on searchText
      data = await getAllArticlesBySearchTextPrismicQuery({
        prismicConnection,
        page: pageNumber,
        searchText
      });
    } else if (category && searchText) {
      // all articles based on category and searchText
      data = await getAllArticlesByCategoryAndSearchTextPrismicQuery({
        prismicConnection,
        page: pageNumber,
        category,
        searchText
      });
    }

    //Check if SEO already exists, if no grab it from the prismic
    if (!SEOdata) {
      SEOdata = await getAllArticlesSEOPrismicQuery({ prismicConnection });
      SEOdata = allArticlesPageSEOHelper(SEOdata);
    }

    //If there is no articles data -> put error true and stop loading
    if (!data) {
      dispatch(setArticlesErrorToTrue());
      return dispatch(setLoadingStop());
    }

    //Sanitize data
    const articlesData = articlesListHelper(data);

    //Dispatch data to the reducer -> if search or category with new initial state, or with all pages and data
    if (category || searchText) {
      dispatch({
        type: GET_ALL_ARTICLES_INITIAL_STATE,
        payload: {
          articlesData,
          page: pageNumber,
          totalPages: data.total_pages,
          category,
          searchText,
          SEO: SEOdata
        }
      });
    } else {
      dispatch({
        type: GET_ALL_ARTICLES,
        payload: {
          articlesData,
          page: pageNumber,
          totalPages: data.total_pages,
          category,
          searchText,
          SEO: SEOdata
        }
      });
    }

    //Set loading to false
    dispatch(setArticlesErrorToFalse());
    dispatch(setLoadingStop());
  } catch (err) {
    //If error return like there is no data and stop loading
    console.log("ERROR CATCH GET_ALL_ARTICLES");
    dispatch(setArticlesErrorToTrue());
    dispatch(setLoadingStop());
  }
};

interface IqueryCommonPart {
  orderings?: string;
  fetch?: string[];
  fetchLinks?: string[];
  pageSize?: string;
}

export const queryCommonPart: IqueryCommonPart = {
  orderings: "[my.single-article.date desc]",
  fetch: [
    "single-article.uid",
    "single-article.title",
    "single-article.short_description",
    "single-article.series",
    "single-article.categories",
    "single-article.tags",
    "single-article.date",
    "single-article.small_img",
    "single-article.xs_img",
    "single-article.author"
  ],
  fetchLinks: [
    "author.uid",
    "author.full_name",
    "author.short_description",
    "author.image_avatar"
  ]
};

export const getAllArticlesPrismicQuery = async ({
  prismicConnection,
  page
}: {
  prismicConnection: IPrismicConnection;
  page: string | number;
}): Promise<any> => {
  if (!prismicConnection.query) return null;

  return await prismicConnection.query(
    Prismic.Predicates.at("document.type", "single-article"),
    {
      page,
      ...queryCommonPart
    }
  );
};

export const getAllArticlesByCategoryPrismicQuery = async ({
  prismicConnection,
  page,
  category
}: {
  prismicConnection: IPrismicConnection;
  page: string | number;
  category: string | null;
}): Promise<any> => {
  if (!prismicConnection.query) return null;

  // if missing data at least last articles
  if (!category)
    return await getAllArticlesPrismicQuery({ prismicConnection, page });

  return await prismicConnection.query(
    [
      Prismic.Predicates.at("document.type", "single-article"),
      Prismic.Predicates.fulltext("my.single-article.categories", category)
    ],
    {
      page,
      ...queryCommonPart
    }
  );
};

export const getAllArticlesBySearchTextPrismicQuery = async ({
  prismicConnection,
  page,
  searchText
}: {
  prismicConnection: IPrismicConnection;
  page: string | number;
  searchText: string | null;
}): Promise<any> => {
  if (!prismicConnection.query) return null;

  // if missing data at least last articles
  if (!searchText)
    return await getAllArticlesPrismicQuery({ prismicConnection, page });

  return await prismicConnection.query(
    [
      Prismic.Predicates.at("document.type", "single-article"),
      Prismic.Predicates.fulltext("document", searchText)
    ],
    {
      page,
      ...queryCommonPart
    }
  );
};

export const getAllArticlesByCategoryAndSearchTextPrismicQuery = async ({
  prismicConnection,
  page,
  category,
  searchText
}: {
  prismicConnection: IPrismicConnection;
  page: string | number;
  category: string | null;
  searchText: string | null;
}): Promise<any> => {
  if (!prismicConnection.query) return null;

  // if missing data at least last articles
  if (!category || !searchText)
    return await getAllArticlesPrismicQuery({ prismicConnection, page });

  return await prismicConnection.query(
    [
      Prismic.Predicates.at("document.type", "single-article"),
      Prismic.Predicates.fulltext("my.single-article.categories", category),
      Prismic.Predicates.fulltext("document", searchText)
    ],
    {
      page,
      ...queryCommonPart
    }
  );
};

export const getAllArticlesSEOPrismicQuery = async ({
  prismicConnection
}: {
  prismicConnection: IPrismicConnection;
}): Promise<any> => {
  if (!prismicConnection.query) return null;

  return await prismicConnection.query(
    Prismic.Predicates.at("document.type", "all-articles-seo")
  );
};
