import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer, { initialState } from "../../../store/reducers/loadingReducer";
import {
  setLoadingStart,
  setLoadingStop
} from "../../../store/actions/common/loadingActions";
import {
  LOADING_DATA_START,
  LOADING_DATA_STOP
} from "../../../store/actions/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Redux - loading", () => {
  describe("ACTIONS", () => {
    test("setLoadingStart should set loading to true", async () => {
      const store = mockStore({ ...initialState });
      await store.dispatch(setLoadingStart());
      expect(store.getActions()[0].type).toBe(LOADING_DATA_START);
    });

    test("setLoadingStop should set loading to false", async () => {
      const store = mockStore({ ...initialState });
      await store.dispatch(setLoadingStop());
      expect(store.getActions()[0].type).toBe(LOADING_DATA_STOP);
    });
  });

  describe("REDUCER", () => {
    test("DUMMY_TYPE should return same state when unknown type", async () => {
      const successResponse = {
        type: "DUMMY_TYPE"
      };
      const reducerState = reducer(initialState, successResponse);
      expect(reducerState).toBeDefined();
      expect(reducerState).toHaveProperty("loading");
      expect(reducerState.loading).toBeFalsy();
      expect(reducerState).toMatchObject(initialState);
    });

    test("LOADING_DATA_START should update state to make loading true", async () => {
      const successResponse = {
        type: LOADING_DATA_START
      };
      const reducerState = reducer(initialState, successResponse);
      expect(reducerState).toBeDefined();
      expect(reducerState).toHaveProperty("loading");
      expect(reducerState.loading).toBeTruthy();
      expect(reducerState).toMatchObject({
        loading: true
      });
    });

    test("LOADING_DATA_STOP should update state to make loading false", async () => {
      const successResponse = {
        type: LOADING_DATA_STOP
      };
      const reducerState = reducer(initialState, successResponse);
      expect(reducerState).toBeDefined();
      expect(reducerState).toHaveProperty("loading");
      expect(reducerState.loading).toBeFalsy();
      expect(reducerState).toMatchObject(initialState);
    });
  });
});
