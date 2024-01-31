import { combineReducers } from "redux";
import CartReducer from "slice/CartSlice";
import ProjectReducer from "slice/ProjectSlice";

const rootReducer = combineReducers({
  cart: CartReducer,
  project: ProjectReducer,
});

export default rootReducer;
