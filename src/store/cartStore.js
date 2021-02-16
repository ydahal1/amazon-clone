import { createStore, Middleware, applyMiddleware } from "redux";
import reducer from "./reducer";

const cartStore = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default cartStore;
