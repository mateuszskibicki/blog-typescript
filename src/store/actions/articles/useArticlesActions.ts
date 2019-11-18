import { useEffect, useCallback, Dispatch } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLast3Articles } from "./articlesActions";
// import { IAuthorSinglePage } from "../../../types/author.types";

export const useGetLast3Articles = () => {
  const { articles } = useSelector((state: any) => state);
  const dispatch: Dispatch<any> = useDispatch();

  const getArticles = useCallback((): void => {
    if (articles && !articles.last3articles) {
      dispatch(getLast3Articles());
    }
  }, [articles, dispatch]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  return [articles.last3articles];
};
