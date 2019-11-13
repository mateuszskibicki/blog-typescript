import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer, { initialState } from "../../../store/reducers/homepageReducer";
import { getHomepageDataPrismic } from "../../../store/actions/homepage/homepageActions";
import {
  LOADING_DATA_START,
  LOADING_DATA_STOP,
  GET_HOMEPAGE_DATA_PRISMIC
} from "../../../store/actions/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Redux - homepage", () => {
  describe("ACTIONS", () => {
    describe("getHomepageDataPrismic", () => {
      test("/ - Get homepage data from prismic ", async () => {
        const store = mockStore({ ...initialState });
        //@ts-ignore
        await store.dispatch(getHomepageDataPrismic());
        expect(store.getActions()[0].type).toBe(LOADING_DATA_START);
        expect(store.getActions()[1].type).toBe(GET_HOMEPAGE_DATA_PRISMIC);
        expect(store.getActions()[2].type).toBe(LOADING_DATA_STOP);
      });
    });

    describe("REDUCER", () => {
      test("should return same state when unknown type", async () => {
        const successResponse = {
          type: "DUMMY_TYPE"
        };
        expect(reducer(initialState, successResponse)).toBeDefined();
        expect(reducer(initialState, successResponse)).toHaveProperty("data");
        expect(reducer(initialState, successResponse).data).toBeNull();
        expect(reducer(initialState, successResponse)).toMatchObject(
          initialState
        );
      });

      test("should update state to keep homepage data", async () => {
        const successResponse = {
          type: GET_HOMEPAGE_DATA_PRISMIC,
          payload: { dummyData: 123 }
        };
        expect(reducer(initialState, successResponse)).toHaveProperty("data");
        expect(reducer(initialState, successResponse).data).toBeDefined();
        expect(reducer(initialState, successResponse).data).toHaveProperty(
          "dummyData"
        );
      });
    });
  });
});
