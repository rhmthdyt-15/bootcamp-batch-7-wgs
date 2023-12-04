// import { createStore } from "redux";
// import counterReducer from "./counterReducer";
// import { composeWithDevTools } from "redux-devtools-extension";

// const store = createStore(counterReducer);

// export default store;

import { createStore } from "redux";
import counterReducer from "./counterReducer";
import { composeWithDevTools } from "redux-devtools-extension";

// Jika Redux DevTools Extension ada, gunakan composeWithDevTools
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools;

const store = createStore(counterReducer, composeEnhancers());

export default store;
