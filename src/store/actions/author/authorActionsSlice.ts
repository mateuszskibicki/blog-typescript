import Prismic from "prismic-javascript";
import { Dispatch } from "react";
// import { GET_AUTHOR_BY_UID, SET_ERROR_AUTHOR_BY_UID_TRUE } from "../types";
// loading
import { setLoadingStart, setLoadingStop } from "../common/loadingActions";
// helpers
import { authorPageHelper } from "../../../helpers/author/AuthorPageHelpers";
import { articlesListHelper } from "../../../helpers/articles/ArticlesHelpers";
import { IgetRelatedToAuthorArticles } from "../../../types/author.types";

import { getAuthorByUID, setAuthorErrorTrue } from "../../reducers/authorSlice";

// Get author data by UID from prismic CMS
export const getAuthorByUidPrismic = (uid: string) => async (
  dispatch: Dispatch<{ type: string; payload: any }>
  // getState: Function
) => {
  try {
    // Start loading
    dispatch(setLoadingStart());
    // console.log(setAuthorErrorTrue({ uid }));
    //Prismic connection
    const PrismicEndpoint: string | null =
      process.env.REACT_APP_PRISMIC_API_ENDPOINT || null;
    const PrismicToken: string | null =
      process.env.REACT_APP_PRISMIC_API_TOKEN || null;

    //If no settings -> return error
    if (!PrismicEndpoint || !PrismicToken) {
      dispatch(setAuthorErrorTrue({ uid }));
      dispatch(setLoadingStop());
      return;
    }

    const prismicConnection = await Prismic.getApi(PrismicEndpoint, {
      accessToken: PrismicToken
    });

    //Get author by uid from URL query
    const data = await prismicConnection.getByUID("author", uid);

    //If there is no author return payload null and stop loading
    if (!data) {
      dispatch(setAuthorErrorTrue({ uid }));
      dispatch(setLoadingStop());
      return;
    }

    //If there is author use helper to sanitize data
    const authorData = authorPageHelper(data);

    //If no data -> return error
    if (!authorData || !authorData.author) {
      dispatch(setAuthorErrorTrue({ uid }));
      dispatch(setLoadingStop());
      return;
    }

    //If get user ID
    const userId: string = authorData.author.id;

    //Get related articles
    const connectedArticles = await getRelatedToAuthorArticles({
      prismicConnection,
      userId
    });

    //If there is no article related to this author
    if (
      !connectedArticles ||
      !connectedArticles.results ||
      connectedArticles.results.length === 0
    ) {
      dispatch(getAuthorByUID({ uid, authorData }));
      dispatch(setLoadingStop());
      return;
    }

    //If there is at least 1 article, add minified array to authorData object
    authorData.articles = articlesListHelper(connectedArticles);

    // Dispatch object and at the very end set loading to false
    dispatch(getAuthorByUID({ uid, authorData }));
    dispatch(setLoadingStop());
  } catch (err) {
    //If error return like there is no data and stop loading
    console.log("ERROR CATCH GET_AUTHOR_BY_UID");
    dispatch(setLoadingStop());
  }
};

export const getRelatedToAuthorArticles = async (
  args: IgetRelatedToAuthorArticles
): Promise<any> => {
  const { prismicConnection, userId } = args;

  if (!prismicConnection.query) return null;

  try {
    const connectedArticles = await prismicConnection.query(
      [
        Prismic.Predicates.at("document.type", "single-article"),
        Prismic.Predicates.at("my.single-article.author", userId)
      ],
      {
        fetch: [
          "single-article.uid",
          "single-article.title",
          "single-article.short_description",
          "single-article.series",
          "single-article.categories",
          "single-article.tags",
          "single-article.date",
          "single-article.small_img",
          "single-article.author"
        ],
        fetchLinks: [
          "author.uid",
          "author.full_name",
          "author.short_description",
          "author.image_avatar"
        ],
        pageSize: 3
      }
    );

    return connectedArticles;
  } catch (err) {
    console.log("ERROR CATCH GET_AUTHOR_BY_UID -> related articles");
    throw new Error("ERROR CATCH GET_AUTHOR_BY_UID -> related articles");
  }
};
