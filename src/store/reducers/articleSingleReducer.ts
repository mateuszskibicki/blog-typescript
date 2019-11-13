import {
  GET_ARTICLE_BY_UID,
  GET_3_LAST_ARTICLES,
  SET_ERROR_SINGLE_ARTICLE_TRUE,
  SET_CURRENT_ARTICLE_UID
} from "../actions/types";
import { produce, Draft } from "immer";

interface IState {
  currentArticleUID: null | string;
  lastArticles: null | any | Array<any>;
}

export const initialState: IState = {
  currentArticleUID: null,
  lastArticles: null
};

export default function(state: IState = initialState, action: any) {
  return produce(state as IState, (draft: Draft<any>) => {
    switch (action.type) {
      case SET_ERROR_SINGLE_ARTICLE_TRUE:
        draft[action.payload.articleUID].error = true;
        break;
      case SET_CURRENT_ARTICLE_UID:
        draft.currentArticleUID = action.payload.articleUID;
        break;
      case GET_3_LAST_ARTICLES:
        draft.lastArticles = action.payload.lastArticles;
        break;
      case GET_ARTICLE_BY_UID:
        draft.error = false;
        draft.currentArticleUID = action.payload.articleUID;
        draft[action.payload.articleUID] = action.payload.articleData;
        break;
    }
  });
}
