import { LOADING_DATA_START, LOADING_DATA_STOP } from "../types";
import { IAction } from "../../../types/common.types";
import { Dispatch } from "react";

// Set loading to true
export const setLoadingStart: Function = (): Function => (
  dispatch: Dispatch<IAction>
): void => {
  dispatch({ type: LOADING_DATA_START });
};

// Set loading to false
export const setLoadingStop: Function = (): Function => (
  dispatch: Dispatch<IAction>
): void => {
  dispatch({ type: LOADING_DATA_STOP });
};
