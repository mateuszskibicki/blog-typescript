import { combineReducers } from "redux";
import loadingReducer from "./loadingReducer";
import authorReducer from "./authorReducer";
import articlesReducer from "./articlesReducer";
import articleSingleReducer from "./articleSingleReducer";
import searchReducer from "./searchReducer";
import mailchimpReducer from "./mailchimpReducer";

export default combineReducers({
  loading: loadingReducer,
  authors: authorReducer,
  articles: articlesReducer,
  article: articleSingleReducer,
  search: searchReducer,
  mailchimp: mailchimpReducer
});
