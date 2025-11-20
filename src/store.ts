import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./features";

import { userApi } from "./features/user/service";
import { authApi } from "./features/auth/service";
import { brandApi } from "./features/brand/service";
import { collectionApi } from "./features/collection/service";
import { styleApi } from "./features/style/service";
import { itemApi } from "./features/item/service";
import { searchApi } from "./features/search/service";
import { locationApi } from "./features/location/service";
import { mainApi } from "./features/main/service";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(mainApi.middleware)
      .concat(userApi.middleware)
      .concat(authApi.middleware)
      .concat(brandApi.middleware)
      .concat(collectionApi.middleware)
      .concat(styleApi.middleware)
      .concat(itemApi.middleware)
      .concat(searchApi.middleware)
      .concat(locationApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
