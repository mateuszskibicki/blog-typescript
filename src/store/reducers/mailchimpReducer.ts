import {
  SUBSCRIBE_TO_MAILCHIMP,
  SET_LOADING_START_MAILCHIMP,
  SET_LOADING_STOP_MAILCHIMP,
  SET_MAILCHIMP_ERROR_TRUE,
  SET_MAILCHIMP_ERROR_FALSE
} from "../actions/types";

interface IInitialState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const initialState: IInitialState = {
  loading: false,
  error: null,
  success: false
};

export default function(
  state = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case SET_LOADING_START_MAILCHIMP:
      return {
        ...state,
        loading: true
      };
    case SET_LOADING_STOP_MAILCHIMP:
      return {
        ...state,
        loading: false
      };
    case SET_MAILCHIMP_ERROR_TRUE:
      return {
        ...state,
        error:
          action.payload.message || "Something went wrong, try again later."
      };
    case SET_MAILCHIMP_ERROR_FALSE:
      return {
        ...state,
        error: false
      };
    case SUBSCRIBE_TO_MAILCHIMP:
      return {
        ...state,
        success: true
      };
    default:
      return state;
  }
}
