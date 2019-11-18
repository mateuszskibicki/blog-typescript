import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

//import logger from "redux-logger";

// export default function initializeStore(initialState: any) {
//   return createStore(
//     rootReducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
//   );
// }

export default configureStore({
  reducer: rootReducer
});
