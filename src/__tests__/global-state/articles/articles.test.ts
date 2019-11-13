import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Prismic from "prismic-javascript";
import reducer, { initialState } from "../../../store/reducers/articlesReducer";
import {
  setArticlesErrorToFalse,
  setArticlesErrorToTrue,
  getAllArticles,
  queryCommonPart,
  getAllArticlesPrismicQuery,
  getAllArticlesByCategoryPrismicQuery,
  getAllArticlesBySearchTextPrismicQuery,
  getAllArticlesByCategoryAndSearchTextPrismicQuery,
  getAllArticlesSEOPrismicQuery
} from "../../../store/actions/articles/articlesActions";
import {
  LOADING_DATA_START,
  LOADING_DATA_STOP,
  SET_ERROR_ALL_ARTICLES_FALSE,
  SET_ERROR_ALL_ARTICLES_TRUE,
  GET_ALL_ARTICLES,
  GET_ALL_ARTICLES_INITIAL_STATE
} from "../../../store/actions/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Redux - author", () => {
  // --------------------
  // ------------ ACTIONS
  // --------------------
  //@ts-ignore
  let prismicConnection: any;
  describe("ACTIONS", () => {
    //GET PRISMIC CONNECTION FOR ALL
    beforeAll(async () => {
      prismicConnection = await Prismic.getApi(
        //@ts-ignore
        process.env.REACT_APP_PRISMIC_API_ENDPOINT,
        {
          accessToken: process.env.REACT_APP_PRISMIC_API_TOKEN
        }
      );
    });

    //SET ERROR TO TRUE
    test("setArticlesErrorToTrue - should set articles error to true", async () => {
      const store = mockStore({ ...initialState });
      //@ts-ignore
      await store.dispatch(setArticlesErrorToTrue());
      expect(store.getActions()[0].type).toBe(SET_ERROR_ALL_ARTICLES_TRUE);
    });

    //SET ERROR TO FALSE
    test("setArticlesErrorToFalse - should set articles error to false", async () => {
      const store = mockStore({ ...initialState });
      //@ts-ignore
      await store.dispatch(setArticlesErrorToFalse());
      expect(store.getActions()[0].type).toBe(SET_ERROR_ALL_ARTICLES_FALSE);
    });

    //queryCommonPart - reduce size of the file
    test("queryCommonPart - should return object with all properties", async () => {
      expect(queryCommonPart).toBeDefined();
      expect(queryCommonPart).toBeInstanceOf(Object);
      expect(queryCommonPart).toHaveProperty("orderings");
      expect(queryCommonPart).toHaveProperty("fetch");
      expect(queryCommonPart).toHaveProperty("fetchLinks");
    });

    //getAllArticlesPrismicQuery - seprated part of the prismic connection to get articles without any options
    test("getAllArticlesPrismicQuery - query prismic articles data without options", async () => {
      const data = await getAllArticlesPrismicQuery({
        prismicConnection,
        page: 1
      });
      expect(getAllArticlesPrismicQuery).toBeDefined();
      expect(getAllArticlesPrismicQuery).toBeInstanceOf(Object);
      expect(data).toHaveProperty("results");
      expect(data).toHaveProperty("page");
      expect(data).toHaveProperty("results_per_page");
    });

    //getAllArticlesByCategoryPrismicQuery - seprated part of the prismic connection to get articles by category
    test("getAllArticlesByCategoryPrismicQuery - query prismic articles data by category", async () => {
      const data = await getAllArticlesByCategoryPrismicQuery({
        //@ts-ignore
        prismicConnection,
        page: 1,
        category: "front-end"
      });
      expect(getAllArticlesByCategoryPrismicQuery).toBeDefined();
      expect(getAllArticlesByCategoryPrismicQuery).toBeInstanceOf(Object);
      expect(data).toHaveProperty("results");
      expect(data).toHaveProperty("page");
      expect(data).toHaveProperty("results_per_page");
    });

    //getAllArticlesBySearchTextPrismicQuery - seprated part of the prismic connection to get articles by searchText
    test("getAllArticlesBySearchTextPrismicQuery - query prismic articles data by searchText", async () => {
      const data = await getAllArticlesBySearchTextPrismicQuery({
        //@ts-ignore
        prismicConnection,
        page: 1,
        searchText: "javascript"
      });
      expect(getAllArticlesBySearchTextPrismicQuery).toBeDefined();
      expect(getAllArticlesBySearchTextPrismicQuery).toBeInstanceOf(Object);
      expect(data).toHaveProperty("results");
      expect(data).toHaveProperty("page");
      expect(data).toHaveProperty("results_per_page");
    });

    //getAllArticlesByCategoryAndSearchTextPrismicQuery - seprated part of the prismic connection to get articles by category and searchText
    test("getAllArticlesByCategoryAndSearchTextPrismicQuery - query prismic articles data by category and searchText", async () => {
      const data = await getAllArticlesByCategoryAndSearchTextPrismicQuery({
        //@ts-ignore
        prismicConnection,
        page: 1,
        category: "front-end",
        searchText: "javascript"
      });
      expect(getAllArticlesByCategoryAndSearchTextPrismicQuery).toBeDefined();
      expect(getAllArticlesByCategoryAndSearchTextPrismicQuery).toBeInstanceOf(
        Object
      );
      expect(data).toHaveProperty("results");
      expect(data).toHaveProperty("page");
      expect(data).toHaveProperty("results_per_page");
    });

    //getAllArticlesSEOPrismicQuery - query to get the all articles page SEO object
    test("getAllArticlesSEOPrismicQuery - should return correct SEO object", async () => {
      const data = await getAllArticlesSEOPrismicQuery({
        //@ts-ignore
        prismicConnection
      });
      expect(getAllArticlesSEOPrismicQuery).toBeDefined();
      expect(getAllArticlesSEOPrismicQuery).toBeInstanceOf(Object);
      expect(data).toHaveProperty("results");
      expect(data).toHaveProperty("page");
      expect(data).toHaveProperty("results_per_page");
    });

    //getAllArticles - GET EMPTY ARRAY WITH UNEXISTING PAGE NUMBER
    test("getAllArticles /articles?page=123456 - should return empty array and correct object", async () => {
      const page = 123456;
      const store = mockStore({ ...initialState });
      //@ts-ignore
      await store.dispatch(getAllArticles({ page }));
      const storeActions = store.getActions();
      expect(storeActions[0].type).toBe(LOADING_DATA_START);
      expect(storeActions[1].type).toBe(GET_ALL_ARTICLES);
      expect(storeActions[1].payload.page).toBe(page);
      expect(storeActions[1].payload.totalPages).not.toBe(page);
      expect(Array.isArray(storeActions[1].payload.articlesData)).toBeTruthy();
      expect(storeActions[1].payload.articlesData[0]).toBeUndefined();
      expect(storeActions[2].type).toBe(SET_ERROR_ALL_ARTICLES_FALSE);
      expect(storeActions[3].type).toBe(LOADING_DATA_STOP);
    });

    //getAllArticles GET ARRAY WITH ARTICLES - PAGE 1 - no category and no searchText
    test("getAllArticles /articles - should return correct data", async () => {
      const page = 1;
      const category = null;
      const searchText = null;
      const store = mockStore({ ...initialState });
      //@ts-ignore
      await store.dispatch(getAllArticles({ page, category, searchText }));
      const storeActions = store.getActions();
      expect(storeActions[0].type).toBe(LOADING_DATA_START);
      expect(storeActions[1].type).toBe(GET_ALL_ARTICLES);
      expect(storeActions[1].payload.page).toBe(page);
      expect(storeActions[1].payload.category).toBe(category);
      expect(storeActions[1].payload.searchText).toBe(searchText);
      expect(Array.isArray(storeActions[1].payload.articlesData)).toBeTruthy();
      expect(storeActions[1].payload.articlesData[0]).toBeDefined();
      expect(storeActions[1].payload.articlesData[0].uid).toBeDefined();
      expect(storeActions[2].type).toBe(SET_ERROR_ALL_ARTICLES_FALSE);
      expect(storeActions[3].type).toBe(LOADING_DATA_STOP);
    });

    //getAllArticles GET ARRAY WITH ARTICLES - PAGE 1 - category front-end and no searchText
    test("getAllArticles /articles?category=front-end - should return correct data", async () => {
      const page = 1;
      const category = "front-end";
      const searchText = null;
      const store = mockStore({ ...initialState });
      //@ts-ignore
      await store.dispatch(getAllArticles({ page, category, searchText }));
      const storeActions = store.getActions();
      expect(storeActions[0].type).toBe(LOADING_DATA_START);
      expect(storeActions[1].type).toBe(GET_ALL_ARTICLES_INITIAL_STATE);
      expect(storeActions[1].payload.page).toBe(page);
      expect(storeActions[1].payload.category).toBe(category);
      expect(storeActions[1].payload.searchText).toBe(searchText);
      expect(Array.isArray(storeActions[1].payload.articlesData)).toBeTruthy();
      expect(storeActions[2].type).toBe(SET_ERROR_ALL_ARTICLES_FALSE);
      expect(storeActions[3].type).toBe(LOADING_DATA_STOP);
    });

    //getAllArticles GET ARRAY WITH ARTICLES - PAGE 1 - category front-end and searchText javascript
    test("getAllArticles /articles?category=front-end&searchText=javascript - should return correct data", async () => {
      const page = 1;
      const category = "front-end";
      const searchText = "javascript";
      const store = mockStore({ ...initialState });
      //@ts-ignore
      await store.dispatch(getAllArticles({ page, category, searchText }));
      const storeActions = store.getActions();
      expect(storeActions[0].type).toBe(LOADING_DATA_START);
      expect(storeActions[1].type).toBe(GET_ALL_ARTICLES_INITIAL_STATE);
      expect(storeActions[1].payload.page).toBe(page);
      expect(storeActions[1].payload.category).toBe(category);
      expect(storeActions[1].payload.searchText).toBe(searchText);
      expect(Array.isArray(storeActions[1].payload.articlesData)).toBeTruthy();
      expect(storeActions[2].type).toBe(SET_ERROR_ALL_ARTICLES_FALSE);
      expect(storeActions[3].type).toBe(LOADING_DATA_STOP);
    });
  });

  // --------------------
  // ------------ REDUCER
  // --------------------
  describe("REDUCER", () => {
    //RETURN SAME STATE
    test("DUMMY_TYPE - should return same state when unknown type", async () => {
      const wrongResponse = {
        type: "DUMMY_TYPE"
      };
      expect(reducer(initialState, wrongResponse)).toBeDefined();
      expect(reducer(initialState, wrongResponse)).toMatchObject(initialState);
    });

    //SET ERROR TO TRUE
    test("SET_ERROR_ALL_ARTICLES_TRUE - should make error true", async () => {
      const errorResponse = {
        type: SET_ERROR_ALL_ARTICLES_TRUE
      };
      expect(reducer(initialState, errorResponse)).toBeDefined();
      expect(reducer(initialState, errorResponse).error).toBeTruthy();
    });

    //SET ERROR TO FALSE
    test("SET_ERROR_ALL_ARTICLES_FALSE - should change error to false", async () => {
      const successResponse = {
        type: SET_ERROR_ALL_ARTICLES_FALSE
      };
      const localInitialState = { false: true };
      //@ts-ignore
      expect(reducer(localInitialState, successResponse)).toBeDefined();
      //@ts-ignore
      expect(reducer(localInitialState, successResponse).error).toBeFalsy();
    });

    //GET_ALL_ARTICLES - WRONG PAGE BUT STILL WORKS
    test("GET_ALL_ARTICLES /articles?page=123456 - should return empty array because page doesn't exist", async () => {
      const successResponse = {
        type: GET_ALL_ARTICLES,
        payload: {
          page: 123456
        }
      };
      expect(reducer(initialState, successResponse)).toBeDefined();
      expect(reducer(initialState, successResponse).currentPage).toBe(123456);
    });

    //GET_ALL_ARTICLES - CORRECT PAYLOAD
    test("GET_ALL_ARTICLES /articles?page=1 - should return correct object with all properties", async () => {
      const successResponse = {
        type: GET_ALL_ARTICLES,
        payload: {
          page: 1,
          articlesData: ["first", "second"],
          totalPages: 3,
          category: null,
          searchText: "javascript"
        }
      };
      const reducerState = reducer(initialState, successResponse);
      expect(reducerState).toBeDefined();
      expect(reducerState.currentPage).toBe(1);
      expect(reducerState.totalPages).toBe(3);
      expect(reducerState.category).toBeNull();
      expect(reducerState.searchText).toBe("javascript");
    });
  });
});
