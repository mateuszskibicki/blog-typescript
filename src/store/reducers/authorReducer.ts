import {
  GET_AUTHOR_BY_UID,
  SET_ERROR_AUTHOR_BY_UID_TRUE
} from "../actions/types";

export const initialState: object = {};

export default function(
  state = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case GET_AUTHOR_BY_UID:
      return {
        ...state,
        ...action.payload
      };
    case SET_ERROR_AUTHOR_BY_UID_TRUE:
      return {
        ...state,
        [action.payload.uid]: { error: true }
      };

    default:
      return state;
  }
}
