import { configureStore } from "@reduxjs/toolkit";
import { allReducers } from "./reducers/allReducers";

export const store = configureStore({
    reducer: allReducers,
    devTools: process.env.NODE_ENV !== 'production',
});
