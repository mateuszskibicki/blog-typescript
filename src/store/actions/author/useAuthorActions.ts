import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuthorByUidPrismic } from "./authorActions";
import { IAuthorSinglePage } from "../../../types/author.types";

export const useGetAuthorByUidPrismic = (
  uid: string
): [IAuthorSinglePage, any] => {
  const authors = useSelector((state: any) => state.authors);
  const loading = useSelector((state: any) => state.loading);
  const dispatch = useDispatch();

  const getUserByUID = useCallback(async (): Promise<any> => {
    if (authors && !authors[uid]) {
      dispatch(await getAuthorByUidPrismic(uid));
    }
  }, [authors, uid, dispatch]);

  useEffect(() => {
    getUserByUID();
  }, [uid, getUserByUID]);

  return [authors[uid], loading];
};
