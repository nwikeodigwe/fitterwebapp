import { persistor, type AppDispatch } from "@/store";
import { clearTokens } from "@/features/auth/slice";
import { clearUser } from "@/features/user/slice";

export const clearAllPersistedState = () => {
  persistor.purge();
};

export const clearAllState = (dispatch: AppDispatch) => {
  dispatch(clearTokens());
  dispatch(clearUser());
};

export const resetAllState = (dispatch: AppDispatch) => {
  clearAllState(dispatch);
  clearAllPersistedState();
};
