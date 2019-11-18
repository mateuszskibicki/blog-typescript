import {
  GET_ALL_ARTICLES,
  GET_ALL_ARTICLES_INITIAL_STATE,
  SET_ERROR_ALL_ARTICLES_FALSE,
  SET_ERROR_ALL_ARTICLES_TRUE,
  GET_3_LAST_ARTICLES
} from "../actions/types";
import { produce, Draft } from "immer";
import { ISEO } from "../../types/common.types";

interface IInitialState {
  error: boolean;
  currentPage: null | string | number;
  totalPages: null | string | number;
  category: null | string;
  searchText: null | string;
  SEO: null | ISEO;
  last3articles: any;
}

export const initialState: IInitialState = {
  error: false,
  currentPage: null,
  totalPages: null,
  category: null,
  searchText: null,
  SEO: null,
  last3articles: null
};

export default function(
  state: IInitialState = initialState,
  action: { type: string; payload?: any }
) {
  return produce(state as IInitialState, (draft: Draft<any>) => {
    switch (action.type) {
      case SET_ERROR_ALL_ARTICLES_FALSE:
        draft.error = false;
        break;
      case SET_ERROR_ALL_ARTICLES_TRUE:
        draft.error = true;
        break;
      case GET_ALL_ARTICLES:
        draft.currentPage = action.payload.page;
        draft.totalPages = action.payload.totalPages;
        draft.category = action.payload.category;
        draft.searchText = action.payload.searchText;
        draft.SEO = action.payload.SEO;
        draft[action.payload.page] = action.payload.articlesData;
        break;
      case GET_ALL_ARTICLES_INITIAL_STATE:
        draft.currentPage = action.payload.page;
        draft.totalPages = action.payload.totalPages;
        draft.category = action.payload.category;
        draft.searchText = action.payload.searchText;
        draft.SEO = action.payload.SEO;
        draft[action.payload.page] = action.payload.articlesData;
        break;
      case GET_3_LAST_ARTICLES:
        draft.last3articles = action.payload.last3articles;
    }
  });
}
