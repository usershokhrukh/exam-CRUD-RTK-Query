import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../features/UsersApi";
import modalSlice from "../features/ModalSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    modal: modalSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware)
})