import { persistReducer } from "redux-persist";
import rootReducer from "slice/reducer/RootReducer";
// import { encryptTransform } from "redux-persist-transform-encrypt";
import createIdbStorage from "@piotr-cz/redux-persist-idb-storage";
import storage from "redux-persist/lib/storage"; //Local Storage
import sessionStorage from "redux-persist/lib/storage/session";
import { ENV_VAR, PERSIST_STORAGES } from "util/Constant";
import { getEnvVariableValue } from "util/CommonUtil";

function getDefaultPersistStorage(persistStorage?: PERSIST_STORAGES) {
  if (persistStorage === PERSIST_STORAGES.INDEX_DB) {
    return createIdbStorage({ name: "database", storeName: "persist" });
  }
  if (persistStorage === PERSIST_STORAGES.LOCAL_STORAGE) {
    return storage;
  }
  if (persistStorage === PERSIST_STORAGES.SESSION_STORAGE) {
    return sessionStorage;
  }
  return undefined;
}

// const encrypt = encryptTransform({
//   secretKey: getEnvVariableValue(ENV_VAR.VITE_PERSIST_STORAGE_SECRET) ?? "secret-key-001",
// });

const _storage: any = getDefaultPersistStorage(
  getEnvVariableValue(ENV_VAR.VITE_PERSIST_STORAGE) as PERSIST_STORAGES
);

const persistConfig = {
  key: "root",
  storage: _storage,
  // transforms: [encrypt],
};

//@ts-ignore
export const persistedReducer = persistReducer(persistConfig, rootReducer) as typeof rootReducer;

export default persistedReducer;
