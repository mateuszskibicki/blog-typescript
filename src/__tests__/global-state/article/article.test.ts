import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer, {
  initialState
} from "../../../store/reducers/articleSingleReducer";
import {
  setCurrentArticleUID,
  // getSingleArticleByUIDPrismicQuery,
  getArticleByUID
} from "../../../store/actions/article/articleActions";
import {
  LOADING_DATA_START,
  LOADING_DATA_STOP,
  SET_ERROR_SINGLE_ARTICLE_TRUE,
  SET_CURRENT_ARTICLE_UID,
  GET_ARTICLE_BY_UID,
  GET_3_LAST_ARTICLES
  // GET_ALL_ARTICLES
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
    //     prismicConnection = await Prismic.getApi(REACT_APP_PRISMIC_API_ENDPOINT, {
    //       accessToken: process.env.REACT_APP_PRISMIC_API_TOKEN
    //     });
    //   });

    //SET CURRENT ARTICLE UID
    test("setCurrentArticleUID - should set single article error to false", async () => {
      const store = mockStore({ ...initialState });
      //@ts-ignore
      await store.dispatch(setCurrentArticleUID({ articleUID: "12345" }));
      expect(store.getActions()[0].type).toBe(SET_CURRENT_ARTICLE_UID);
    });

    //getSingleArticleByUIDPrismicQuery - seprated part of the prismic connection to get single article by UID
    // test("getSingleArticleByUIDPrismicQuery - query prismic article by UID", async () => {
    //   const prismicConnection = await Prismic.getApi(
    //     REACT_APP_PRISMIC_API_ENDPOINT,
    //     {
    //       accessToken: process.env.REACT_APP_PRISMIC_API_TOKEN
    //     }
    //   );
    //   const data = await getSingleArticleByUIDPrismicQuery({
    //     prismicConnection,
    //     articleUID: 'dummy-uid'
    //   });
    //   expect(getSingleArticleByUIDPrismicQuery).toBeDefined();
    //   expect(getSingleArticleByUIDPrismicQuery).toBeInstanceOf(Object);
    //   expect(data).toHaveProperty("results");
    //   expect(data).toHaveProperty("page");
    //   expect(data).toHaveProperty("results_per_page");
    // });

    //getArticleByUID - set error true - try to get unexisting article by UID
    test("getArticleByUID /articles/dummy-uid - should return null and set error to true", async () => {
      const articleUID = "dummy-uid";
      const store = mockStore({ ...initialState });
      //@ts-ignore
      await store.dispatch(getArticleByUID({ articleUID }));
      const storeActions = store.getActions();
      expect(storeActions[0].type).toBe(LOADING_DATA_START);
      expect(storeActions[1].type).toBe(SET_ERROR_SINGLE_ARTICLE_TRUE);
      expect(storeActions[2].type).toBe(LOADING_DATA_STOP);
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
    test("SET_ERROR_SINGLE_ARTICLE_TRUE - should change error to true", async () => {
      const errorResponse = {
        type: SET_ERROR_SINGLE_ARTICLE_TRUE,
        payload: { articleUID: "123" }
      };
      const reducerState = reducer(initialState, errorResponse);
      expect(reducerState).toBeDefined();
      //@ts-ignore
      expect(reducerState[errorResponse.payload.articleUID].error).toBeTruthy();
    });

    //SET CURRENT USER ID
    test("SET_CURRENT_ARTICLE_UID - should change current UID to new", async () => {
      const successResponse = {
        type: SET_CURRENT_ARTICLE_UID,
        payload: {
          articleUID: "dummy-uid"
        }
      };
      const reducerState = reducer(initialState, successResponse);
      expect(reducerState).toBeDefined();
      //@ts-ignore
      expect(reducerState.error).toBeFalsy();
      expect(reducerState.currentArticleUID).toBe(
        successResponse.payload.articleUID
      );
    });

    //GET_3_LAST_ARTICLES - CORRECT PAYLOAD
    test("GET_3_LAST_ARTICLES - should update state to have last articles", async () => {
      const successResponse = {
        type: GET_3_LAST_ARTICLES,
        payload: {
          lastArticles: [{ uid: 1 }, { uid: 2 }, { uid: 3 }]
        }
      };
      const reducerState = reducer(initialState, successResponse);
      expect(reducerState).toBeDefined();
      //@ts-ignore
      expect(reducerState.error).toBeFalsy();
      expect(Array.isArray(reducerState.lastArticles)).toBeTruthy();
      expect(reducerState.lastArticles[0].uid).toBe(1);
    });

    //GET_ARTICLE_BY_UID - CORRECT PAYLOAD
    test("GET_ARTICLE_BY_UID - should change error to false", async () => {
      const successResponse = {
        type: GET_ARTICLE_BY_UID,
        payload: {
          articleUID: "dummy",
          articleData: { uid: "dummy" }
        }
      };
      const reducerState = reducer(initialState, successResponse);
      expect(reducerState).toBeDefined();
      //@ts-ignore
      expect(reducerState.error).toBeFalsy();
      expect(reducerState.currentArticleUID).toBe(
        successResponse.payload.articleUID
      );
      //@ts-ignore
      expect(reducerState[successResponse.payload.articleUID].uid).toBe(
        successResponse.payload.articleUID
      );
    });

    // //GET_ALL_ARTICLES - CORRECT PAYLOAD
    // test("GET_ALL_ARTICLES /articles?page=1 - should return correct object with all properties", async () => {
    //   const successResponse = {
    //     type: GET_ALL_ARTICLES,
    //     payload: {
    //       page: 1,
    //       articlesData: ["first", "second"],
    //       totalPages: 3,
    //       category: null,
    //       searchText: "javascript"
    //     }
    //   };
    //   expect(reducer(initialState, successResponse)).toBeDefined();
    //   expect(reducer(initialState, successResponse).currentPage).toBe(1);
    //   expect(reducer(initialState, successResponse).totalPages).toBe(3);
    //   expect(reducer(initialState, successResponse).category).toBeNull();
    //   expect(reducer(initialState, successResponse).searchText).toBe(
    //     "javascript"
    //   );
    //   expect(
    //     reducer(initialState, successResponse)[successResponse.payload.page]
    //       .length === 2
    //   ).toBeTruthy();
    //   expect(
    //     Array.isArray(
    //       reducer(initialState, successResponse)[successResponse.payload.page]
    //     )
    //   ).toBeTruthy();
    //   expect(
    //     reducer(initialState, successResponse)[successResponse.payload.page][0]
    //   ).toBe(successResponse.payload.articlesData[0]);
    // });
  });
});
