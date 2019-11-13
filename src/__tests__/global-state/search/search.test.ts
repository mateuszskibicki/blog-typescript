import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer, { initialState } from "../../../store/reducers/searchReducer";
import {
  setErrorSearchTextTrue,
  setErrorSearchTextFalse,
  setLoadingSearchTextStart,
  setLoadingSearchTextStop,
  getArticlesBySearchText,
  setSearchText
} from "../../../store/actions/search/searchActions";
import {
  SET_SEARCH_TEXT,
  GET_ARTICLES_BY_SEARCH_TEXT,
  SET_LOADING_SEARCH_START,
  SET_LOADING_SEARCH_STOP,
  SET_ERROR_SEARCH_TEXT_TRUE,
  SET_ERROR_SEARCH_TEXT_FALSE
} from "../../../store/actions/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Redux - author", () => {
  // --------------------
  // ------------ ACTIONS
  // --------------------
  //let prismicConnection;
  describe("ACTIONS", () => {
    //GET PRISMIC CONNECTION FOR ALL
    // beforeAll(async () => {
    //   prismicConnection = await Prismic.getApi(REACT_APP_PRISMIC_API_ENDPOINT, {
    //     accessToken: process.env.REACT_APP_PRISMIC_API_TOKEN
    //   });
    // });

    //SET ERROR TO TRUE
    test("setErrorSearchTextTrue - should set search error to true", async () => {
      const store = mockStore({ ...initialState });
      //@ts-ignore
      await store.dispatch(setErrorSearchTextTrue());
      expect(store.getActions()[0].type).toBe(SET_ERROR_SEARCH_TEXT_TRUE);
    });

    //SET ERROR TO FALSE
    test("setErrorSearchTextFalse - should set search error to false", async () => {
      const store = mockStore({ ...initialState });
      //@ts-ignore
      await store.dispatch(setErrorSearchTextFalse());
      expect(store.getActions()[0].type).toBe(SET_ERROR_SEARCH_TEXT_FALSE);
    });

    //SET LOADING TO TRUE
    test("setLoadingSearchTextStart - should set search loading to true", async () => {
      const store = mockStore({ ...initialState });
      //@ts-ignore
      await store.dispatch(setLoadingSearchTextStart());
      expect(store.getActions()[0].type).toBe(SET_LOADING_SEARCH_START);
    });

    //SET LOADING TO FALSE
    test("setLoadingSearchTextStop - should set search loading to false", async () => {
      const store = mockStore({ ...initialState });
      //@ts-ignore
      await store.dispatch(setLoadingSearchTextStop());
      expect(store.getActions()[0].type).toBe(SET_LOADING_SEARCH_STOP);
    });

    //SET SEARCH TEXT
    test("setLoadingSearchTextStop - should set search loading to false", async () => {
      const store = mockStore({ ...initialState });
      const newSearchText = "dummy12345 aaa";
      //@ts-ignore
      await store.dispatch(setSearchText(newSearchText));
      expect(store.getActions()[0].type).toBe(SET_SEARCH_TEXT);
      expect(store.getActions()[0].payload.searchText).toBe(newSearchText);
    });

    //getArticlesBySearchText - should do nothing when searchText isn't provided just change loading to stop
    test("getArticlesBySearchText - should do nothing when searchText isn't provided just change loading to stop", async () => {
      const store = mockStore({ ...initialState });
      //@ts-ignore
      await store.dispatch(getArticlesBySearchText({ searchText: "" }));
      expect(store.getActions()[0].type).toBe(SET_LOADING_SEARCH_STOP);
    });

    //getArticlesBySearchText - should return empty array when dummy text is provided
    test("getArticlesBySearchText - should return empty array when dummy text is provided", async () => {
      const store = mockStore({ ...initialState });
      const searchText = "dummy12345 aaa";
      //@ts-ignore
      await store.dispatch(getArticlesBySearchText({ searchText }));
      const storeActions = store.getActions();
      expect(storeActions[0].type).toBe(SET_LOADING_SEARCH_START);
      expect(storeActions[1].type).toBe(SET_ERROR_SEARCH_TEXT_FALSE);
      expect(storeActions[2].type).toBe(GET_ARTICLES_BY_SEARCH_TEXT);
      expect(storeActions[2].payload.articlesData).toStrictEqual([]);
      expect(storeActions[3].type).toBe(SET_LOADING_SEARCH_STOP);
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
      const reducerState = reducer(initialState, wrongResponse);
      expect(reducerState).toBeDefined();
      expect(reducerState).toMatchObject(initialState);
    });

    //SET ERROR TO TRUE
    test("SET_ERROR_SEARCH_TEXT_TRUE - should change error to true", async () => {
      const errorResponse = {
        type: SET_ERROR_SEARCH_TEXT_TRUE
      };
      const reducerState = reducer(initialState, errorResponse);
      expect(reducerState).toBeDefined();
      expect(reducerState.error).toBeTruthy();
    });

    //SET ERROR TO FALSE
    test("SET_ERROR_SEARCH_TEXT_FALSE - should change error to false", async () => {
      const successResponse = {
        type: SET_ERROR_SEARCH_TEXT_FALSE
      };
      const localInitialState = { error: true };
      //@ts-ignore
      const reducerState = reducer(localInitialState, successResponse);
      expect(reducerState).toBeDefined();
      expect(reducerState.error).toBeFalsy();
    });

    //SET LOADING TO TRUE
    test("SET_LOADING_SEARCH_START - should change error to true", async () => {
      const errorResponse = {
        type: SET_LOADING_SEARCH_START
      };
      const reducerState = reducer(initialState, errorResponse);
      expect(reducerState).toBeDefined();
      expect(reducerState.loading).toBeTruthy();
    });

    //SET LOADING TO FALSE
    test("SET_LOADING_SEARCH_STOP - should change error to false", async () => {
      const successResponse = {
        type: SET_LOADING_SEARCH_STOP
      };
      const localInitialState = { error: true };
      //@ts-ignore
      const reducerState = reducer(localInitialState, successResponse);
      expect(reducerState).toBeDefined();
      expect(reducerState.loading).toBeFalsy();
    });

    //SET SEARCH TEXT
    test("SET_SEARCH_TEXT - should change search text", async () => {
      const successResponse = {
        type: SET_SEARCH_TEXT,
        payload: {
          searchText: "dummy text"
        }
      };
      const reducerState = reducer(initialState, successResponse);
      expect(reducerState).toBeDefined();
      expect(reducerState.loading).toBeFalsy();
      expect(reducerState.error).toBeFalsy();
      expect(reducerState.articles).toBeNull();
      expect(reducerState.searchText).toBe(successResponse.payload.searchText);
    });

    //GET_ARTICLES_BY_SEARCH_TEXT
    test("GET_ARTICLES_BY_SEARCH_TEXT - should add articles it found", async () => {
      const successResponse = {
        type: GET_ARTICLES_BY_SEARCH_TEXT,
        payload: {
          articlesData: [{ uid: 1 }, { uid: 2 }]
        }
      };
      const reducerState = reducer(initialState, successResponse);
      expect(reducerState).toBeDefined();
      expect(reducerState.loading).toBeFalsy();
      expect(reducerState.error).toBeFalsy();
      expect(reducerState.articles).toStrictEqual(
        successResponse.payload.articlesData
      );
    });
  });
});
