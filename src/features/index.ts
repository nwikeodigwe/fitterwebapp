import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import { userApi } from "./user/service";
import { authApi } from "./auth/service";
import authReducer from "./auth/slice";
// import eventReducer from "./event/slice";
// import addressReducer from "./address/slice";
// import preferenceReducer from "./preferences/slice";
// import cartReducer from "./cart/slice";
// import historyReducer from "./historySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  //   event: eventReducer,
  //   address: addressReducer,
  //   preferences: preferenceReducer,
  //   cart: cartReducer,
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;
