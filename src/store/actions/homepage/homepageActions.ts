//import axios from "axios";
import Prismic from "prismic-javascript";
import { GET_HOMEPAGE_DATA_PRISMIC } from "../types";
// loading
import { setLoadingStart, setLoadingStop } from "../common/loadingActions";
import { Dispatch } from "react";

// Get homepage data from prismic CMS
export const getHomepageDataPrismic = () => async (
  dispatch: Dispatch<{ type: string; payload?: any }>
) => {
  dispatch(setLoadingStart());

  //Prismic connection
  const PrismicEndpoint: string | null =
    process.env.REACT_APP_PRISMIC_API_ENDPOINT || null;
  const PrismicToken: string | null =
    process.env.REACT_APP_PRISMIC_API_TOKEN || null;

  //If no settings -> return error
  if (!PrismicEndpoint || !PrismicToken) {
    dispatch(setLoadingStop());
    return;
  }

  const prismicConnection = await Prismic.getApi(PrismicEndpoint, {
    accessToken: PrismicToken
  });

  const data = await prismicConnection.getByUID("single-article", "article");
  dispatch({ type: GET_HOMEPAGE_DATA_PRISMIC, payload: data });
  dispatch(setLoadingStop());
};
