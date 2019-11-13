import {
  GET_AUTHOR_BY_UID,
  SET_ERROR_AUTHOR_BY_UID_TRUE
} from "../actions/types";
import { produce, Draft } from "immer";

export const initialState: object = {};

export default function(
  state = initialState,
  action: { type: string; payload?: any }
) {
  return produce(state, (draft: Draft<any>) => {
    switch (action.type) {
      case GET_AUTHOR_BY_UID:
        draft[action.payload.uid] = action.payload.authorData;
        break;
      case SET_ERROR_AUTHOR_BY_UID_TRUE:
        draft[action.payload.uid] = { error: true };
        break;
    }
  });
}
