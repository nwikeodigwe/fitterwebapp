import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./features";
import { userApi } from "./features/user/service";
import { authApi } from "./features/auth/service";
import { brandApi } from "./features/brand/service";
import { collectionApi } from "./features/collection/service";
import { styleApi } from "./features/style/service";
import { itemApi } from "./features/item/service";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userApi.middleware)
      .concat(authApi.middleware)
      .concat(brandApi.middleware)
      .concat(collectionApi.middleware)
      .concat(styleApi.middleware)
      .concat(itemApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
