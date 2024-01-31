import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { persistedReducer } from "slice/reducer/PersistedReducer";
import { ENV_VAR } from "util/Constant";
import rootReducer from "slice/reducer/RootReducer";
import { getEnvVariableValue } from "util/CommonUtil";

const store = configureStore({
  reducer:
    getEnvVariableValue(ENV_VAR.VITE_SHOULD_PERSIST) === "Y" ? persistedReducer : rootReducer,
  middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
