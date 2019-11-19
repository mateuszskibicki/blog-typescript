import { combineReducers } from "redux";
import loadingReducer from "./loadingReducer";
import authorReducer from "./authorReducer";
import authorSlice from "./authorSlice";
import articlesReducer from "./articlesReducer";
import articleSingleReducer from "./articleSingleReducer";
import searchReducer from "./searchReducer";
import mailchimpReducer from "./mailchimpReducer";

export default combineReducers({
  loading: loadingReducer,
  // authors: authorReducer,
  authors: authorSlice,
  articles: articlesReducer,
  article: articleSingleReducer,
  search: searchReducer,
  mailchimp: mailchimpReducer
});
