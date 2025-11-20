import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import authReducer from "./auth/slice";
import searchReducer from "./search/slice";
import preferenceReducer from "./preferences/slice";
import { userApi } from "./user/service";
import { authApi } from "./auth/service";
import { brandApi } from "./brand/service";
import { collectionApi } from "./collection/service";
import { styleApi } from "./style/service";
import { itemApi } from "./item/service";
import { searchApi } from "./search/service";
import { locationApi } from "./location/service";
import { mainApi } from "./main/service";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  search: searchReducer,
  preference: preferenceReducer,
  [mainApi.reducerPath]: mainApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [brandApi.reducerPath]: brandApi.reducer,
  [collectionApi.reducerPath]: collectionApi.reducer,
  [styleApi.reducerPath]: styleApi.reducer,
  [itemApi.reducerPath]: itemApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,
});

export default rootReducer;
