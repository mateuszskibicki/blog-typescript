import { LOADING_DATA_START, LOADING_DATA_STOP } from "../actions/types";

interface IInitialState {
  loading: boolean;
}

export const initialState: IInitialState = {
  loading: false
};

export default function(
  state = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case LOADING_DATA_START:
      return {
        ...state,
        loading: true
      };
    case LOADING_DATA_STOP:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
