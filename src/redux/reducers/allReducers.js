import { combineReducers } from "@reduxjs/toolkit";
import SettingReducer from "./SettingReducer";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";

export const allReducers = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    settings: SettingReducer
})