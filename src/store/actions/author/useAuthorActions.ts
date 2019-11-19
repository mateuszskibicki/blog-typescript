import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuthorByUidPrismic } from "./authorActionsSlice";
import { IAuthorSinglePage } from "../../../types/author.types";

export const useGetAuthorByUidPrismic = (
  uid: string
): [IAuthorSinglePage, any] => {
  const { authors, loading } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const getUserByUID = useCallback((): void => {
    if (authors && !authors[uid]) {
      dispatch(getAuthorByUidPrismic(uid));
    }
  }, [authors, uid, dispatch]);

  useEffect(() => {
    getUserByUID();
  }, [uid, getUserByUID]);

  return [authors[uid], loading];
};
