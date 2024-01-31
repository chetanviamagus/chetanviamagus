import { combineReducers } from "redux";
import DemoArticleReducer from "./DemoArticleReducer";
import DemoListReducer from "./DemoListReducer";
import CounterReducers from "./CounterReducers";

const rootReducer = combineReducers({
  DemoArticleReducer,
  DemoListReducer,
  CounterReducers,
});

export default rootReducer;
