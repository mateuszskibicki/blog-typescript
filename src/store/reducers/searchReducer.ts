import {
  SET_SEARCH_TEXT,
  GET_ARTICLES_BY_SEARCH_TEXT,
  SET_LOADING_SEARCH_START,
  SET_LOADING_SEARCH_STOP,
  SET_ERROR_SEARCH_TEXT_TRUE,
  SET_ERROR_SEARCH_TEXT_FALSE
} from "../actions/types";

interface IInitialState {
  loading: boolean;
  error: boolean;
  articles: Array<any> | null;
  searchText: string;
}

export const initialState: IInitialState = {
  loading: false,
  error: false,
  articles: null,
  searchText: ""
};

export default function(
  state = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case SET_ERROR_SEARCH_TEXT_TRUE:
      return {
        ...state,
        error: true
      };
    case SET_ERROR_SEARCH_TEXT_FALSE:
      return {
        ...state,
        error: false
      };
    case SET_LOADING_SEARCH_START:
      return {
        ...state,
        loading: true
      };
    case SET_LOADING_SEARCH_STOP:
      return {
        ...state,
        loading: false
      };
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload.searchText
      };
    case GET_ARTICLES_BY_SEARCH_TEXT:
      return {
        ...state,
        articles: action.payload.articlesData
      };
    default:
      return state;
  }
}
