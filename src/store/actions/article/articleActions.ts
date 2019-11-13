import { Dispatch } from "react";
import Prismic from "prismic-javascript";
import {
  GET_ARTICLE_BY_UID,
  GET_3_LAST_ARTICLES,
  SET_ERROR_SINGLE_ARTICLE_TRUE,
  SET_CURRENT_ARTICLE_UID
} from "../types";
// loading
import { setLoadingStart, setLoadingStop } from "../common/loadingActions";
// helpers
import { singleArticleHelper } from "../../../helpers/article/ArticleHelpers";
import { articlesListHelper } from "../../../helpers/articles/ArticlesHelpers";
//types
import { ISingleArticlePage } from "../../../types/article.types";
import { IPrismicConnection } from "../../../types/common.types";

// Set single article current UID (when it exists and we're not calling anything)
export const setCurrentArticleUID = ({
  articleUID
}: {
  articleUID: string;
}) => (
  dispatch: Dispatch<{ type: string; payload: { articleUID: string } }>
) => {
  dispatch({ type: SET_CURRENT_ARTICLE_UID, payload: { articleUID } });
};

// Get afticles data by page/tag/search_text/category from prismic CMS
export const getArticleByUID = ({
  articleUID,
  lastArticles
}: {
  articleUID: string;
  lastArticles: Array<any>;
}) => async (dispatch: Dispatch<{ type: string; payload?: any }>) => {
  try {
    // Start loading
    dispatch(setLoadingStart());

    //Prismic connection
    const PrismicEndpoint: string | null =
      process.env.REACT_APP_PRISMIC_API_ENDPOINT || null;
    const PrismicToken: string | null =
      process.env.REACT_APP_PRISMIC_API_TOKEN || null;

    //If no settings -> return error
    if (!PrismicEndpoint || !PrismicToken) {
      dispatch({ type: SET_ERROR_SINGLE_ARTICLE_TRUE });
      dispatch(setLoadingStop());
      return;
    }

    const prismicConnection = await Prismic.getApi(PrismicEndpoint, {
      accessToken: PrismicToken
    });

    //Article query
    const data: Promise<any> = await getSingleArticleByUIDPrismicQuery({
      prismicConnection,
      articleUID
    });

    //If there is no articles data -> put error true and stop loading
    if (!data) {
      dispatch({
        type: SET_ERROR_SINGLE_ARTICLE_TRUE,
        payload: { articleUID }
      });
      return dispatch(setLoadingStop());
    }

    //Last articles data
    let lastArticlesData: any[] = lastArticles;
    //If there is no last 3 articles in redux state --> lastArticles
    if (!lastArticlesData) {
      lastArticlesData = await getLast3ArticlesPrismicQuery({
        prismicConnection
      });
      dispatch({
        type: GET_3_LAST_ARTICLES,
        payload: {
          lastArticles: articlesListHelper(lastArticlesData)
        }
      });
    }

    //Sanitize data
    const articleData: ISingleArticlePage | null = singleArticleHelper(data);

    //Dispatch data to the reducer
    dispatch({
      type: GET_ARTICLE_BY_UID,
      payload: {
        articleData,
        articleUID,
        lastArticles: lastArticlesData
      }
    });

    //Set loading to false
    dispatch(setLoadingStop());
  } catch (err) {
    //If error return like there is no data and stop loading
    console.log("ERROR CATCH GET_ARTICLE_BY_UID");
    dispatch(setLoadingStop());
  }
};

export const getSingleArticleByUIDPrismicQuery = async ({
  prismicConnection,
  articleUID
}: {
  prismicConnection: IPrismicConnection;
  articleUID: string;
}) => {
  if (!prismicConnection.getByUID || !articleUID) return null;

  return await prismicConnection.getByUID("single-article", articleUID, {
    fetchLinks: [
      "author.uid",
      "author.full_name",
      "author.short_description",
      "author.image_avatar"
    ]
  });
};

export const getLast3ArticlesPrismicQuery = async ({
  prismicConnection
}: {
  prismicConnection: IPrismicConnection;
}) => {
  if (!prismicConnection.query) return null;

  return await prismicConnection.query(
    Prismic.Predicates.at("document.type", "single-article"),
    {
      pageSize: 3,
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
        "single-article.author"
      ],
      fetchLinks: [
        "author.uid",
        "author.full_name",
        "author.short_description",
        "author.image_avatar"
      ]
    }
  );
};
