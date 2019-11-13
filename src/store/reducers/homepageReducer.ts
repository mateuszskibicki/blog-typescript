import { GET_HOMEPAGE_DATA_PRISMIC } from "../actions/types";

interface IInitialState {
  data: any | null;
}

export const initialState: IInitialState = {
  data: null
};

export default function(
  state = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case GET_HOMEPAGE_DATA_PRISMIC:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}
