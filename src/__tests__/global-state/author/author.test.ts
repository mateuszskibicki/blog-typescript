import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Prismic from "prismic-javascript";
import reducer, { initialState } from "../../../store/reducers/authorReducer";
import {
  getAuthorByUidPrismic,
  getRelatedToAuthorArticles
} from "../../../store/actions/author/authorActions";
import {
  LOADING_DATA_START,
  LOADING_DATA_STOP,
  GET_AUTHOR_BY_UID,
  SET_ERROR_AUTHOR_BY_UID_TRUE
} from "../../../store/actions/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Redux - author", () => {
  // --------------------
  // ------------ ACTIONS
  // --------------------
  describe("ACTIONS", () => {
    //GET UNEXISTING USER AND SET ERROR TO TRUE
    test("getAuthorByUidPrismic /author/fake-wrong - should return error - author with unexisting uid", async () => {
      const userUid = "fake-wrong";
      const store = mockStore({ ...initialState });
      //@ts-ignore
      await store.dispatch(getAuthorByUidPrismic(userUid));
      const storeActions = store.getActions();
      expect(storeActions[0].type).toBe(LOADING_DATA_START);
      expect(storeActions[1].type).toBe(SET_ERROR_AUTHOR_BY_UID_TRUE);
      expect(storeActions[2].type).toBe(LOADING_DATA_STOP);
    });

    //GET EXISTING USER AND CORRECT DATA
    test("getAuthorByUidPrismic /author/mateusz-skibicki - should get author with existing uid", async () => {
      const userUid = "mateusz-skibicki";
      const store = mockStore({ ...initialState });
      //@ts-ignore
      await store.dispatch(getAuthorByUidPrismic(userUid));
      const storeActions = store.getActions();
      expect(storeActions[0].type).toBe(LOADING_DATA_START);
      expect(storeActions[1].type).toBe(GET_AUTHOR_BY_UID);
      expect(storeActions[1].payload[userUid]).toBeDefined();
      expect(storeActions[1].payload[userUid]).toHaveProperty("author");
      expect(storeActions[1].payload[userUid]).toHaveProperty("SEO");
      expect(storeActions[1].payload[userUid]).toHaveProperty("articles");
      expect(storeActions[2].type).toBe(LOADING_DATA_STOP);
    });

    //GET RELATED TO EXISTING USER ARTICLES
    test("getRelatedToAuthorArticles /author/mateusz-skibicki - should get author's array with related articles", async () => {
      //const userUid = "mateusz-skibicki";
      const userId = "XMgXAhAAAKkidmRE";

      const prismicConnection = await Prismic.getApi(
        //@ts-ignore
        process.env.REACT_APP_PRISMIC_API_ENDPOINT,
        {
          accessToken: process.env.REACT_APP_PRISMIC_API_TOKEN
        }
      );
      const objectWithArticles = await getRelatedToAuthorArticles({
        prismicConnection,
        userId
      });
      expect(objectWithArticles).toBeDefined();
      expect(objectWithArticles.results).toBeDefined();
      expect(Array.isArray(objectWithArticles.results)).toBeTruthy();
      expect(objectWithArticles.results.length > 0).toBeTruthy();
      expect(typeof objectWithArticles.results[0] === "object").toBeTruthy();
      expect(objectWithArticles.results[0].uid).toBeDefined();
      expect(objectWithArticles.results[0].id).toBeDefined();
      expect(objectWithArticles.results[0].lang).toBe("en-gb");
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

    //UPDATE REDUCER WITH CORRECT AUTHOR DATA
    test("GET_AUTHOR_BY_UID /author/mateusz-skibicki - should update state with new author object", async () => {
      const successResponse = {
        type: GET_AUTHOR_BY_UID,
        payload: {
          ["mateusz-skibicki"]: {
            author: { uid: "mateusz-skibicki" },
            SEO: { dummy: 123 }
          }
        }
      };
      const reducerState = reducer(initialState, successResponse);
      expect(reducerState).toBeDefined();
      expect(reducerState["mateusz-skibicki"]).toHaveProperty("author");
      expect(reducerState["mateusz-skibicki"]).toHaveProperty("SEO");
    });
  });
});
