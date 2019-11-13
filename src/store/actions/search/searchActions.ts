import Prismic from "prismic-javascript";

import {
  SET_SEARCH_TEXT,
  GET_ARTICLES_BY_SEARCH_TEXT,
  SET_LOADING_SEARCH_START,
  SET_LOADING_SEARCH_STOP,
  SET_ERROR_SEARCH_TEXT_TRUE,
  SET_ERROR_SEARCH_TEXT_FALSE
} from "../types";

import { getAllArticlesBySearchTextPrismicQuery } from "../articles/articlesActions";
import { articlesListHelper } from "../../../helpers/articles/ArticlesHelpers";
//types
import { Dispatch } from "react";
import { ISingleArticle } from "../../../types/article.types";

// Set loading to true -> search by text
export const setSearchText = (searchText: string) => (
  dispatch: Dispatch<{ type: string; payload?: { searchText: string } }>
) => {
  dispatch({ type: SET_SEARCH_TEXT, payload: { searchText } });
};

// Set loading to true -> search by text
export const setLoadingSearchTextStart = () => (
  dispatch: Dispatch<{ type: string }>
) => {
  dispatch({ type: SET_LOADING_SEARCH_START });
};

// Set loading to false -> search by text
export const setLoadingSearchTextStop = () => (
  dispatch: Dispatch<{ type: string }>
) => {
  dispatch({ type: SET_LOADING_SEARCH_STOP });
};

// Set error to true -> search by text
export const setErrorSearchTextTrue = () => (
  dispatch: Dispatch<{ type: string }>
) => {
  dispatch({ type: SET_ERROR_SEARCH_TEXT_TRUE });
};

// Set error to false -> search by text
export const setErrorSearchTextFalse = () => (
  dispatch: Dispatch<{ type: string }>
) => {
  dispatch({ type: SET_ERROR_SEARCH_TEXT_FALSE });
};

export const getArticlesBySearchText = ({
  searchText
}: {
  searchText: string;
}) => async (
  dispatch: Dispatch<{ type: string; payload?: any } | Function>
) => {
  try {
    if (!searchText || searchText.trim().length === 0) {
      return dispatch(setLoadingSearchTextStop());
    }

    // loading and error
    dispatch(setLoadingSearchTextStart());
    dispatch(setErrorSearchTextFalse());

    //Prismic connection
    const PrismicEndpoint: string | null =
      process.env.REACT_APP_PRISMIC_API_ENDPOINT || null;
    const PrismicToken: string | null =
      process.env.REACT_APP_PRISMIC_API_TOKEN || null;

    //If no settings -> return error
    if (!PrismicEndpoint || !PrismicToken) {
      dispatch(setErrorSearchTextTrue());
      return dispatch(setLoadingSearchTextStop());
    }

    const prismicConnection = await Prismic.getApi(PrismicEndpoint, {
      accessToken: PrismicToken
    });

    //Articles query
    const data = await getAllArticlesBySearchTextPrismicQuery({
      prismicConnection,
      page: 1,
      searchText
    });

    //If there is no articles data -> put error true and stop loading
    if (!data) {
      dispatch(setErrorSearchTextTrue());
      return dispatch(setLoadingSearchTextStop());
    }

    //Sanitize data
    const articlesData: ISingleArticle[] | null = articlesListHelper(data);

    dispatch({
      type: GET_ARTICLES_BY_SEARCH_TEXT,
      payload: {
        articlesData
      }
    });

    //Set loading to false
    dispatch(setLoadingSearchTextStop());
  } catch (err) {
    //If error return like there is no data and stop loading
    console.log("ERROR CATCH GET_ARTICLES_BY_SEARCH_TEXT");
    dispatch(setErrorSearchTextTrue());
    return dispatch(setLoadingSearchTextStop());
  }
};
