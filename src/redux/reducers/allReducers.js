import { combineReducers } from "@reduxjs/toolkit";
import SettingReducer from "./SettingReducer";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";
import ThemeReducer from "./ThemeReducer";
import OnBoardingReducer from "./OnBoardingReducer";

export const allReducers = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    settings: SettingReducer,
    theme: ThemeReducer,
    onboard: OnBoardingReducer
})