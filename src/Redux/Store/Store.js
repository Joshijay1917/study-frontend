import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../Features/ApiSlice";
import userReducer from "../Features/UserSlice"

export const Store = configureStore({
    reducer: {
        user: userReducer,
        [ApiSlice.reducerPath] : ApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ApiSlice.middleware)
})