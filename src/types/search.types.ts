import { ISingleArticle } from "./article.types";

export interface ISearchResults {
  articles: ISingleArticle[];
  error: boolean;
  loading: boolean;
  searchText: string | null;
  setSearchText: Function;
  getArticlesBySearchText?: Function;
}
