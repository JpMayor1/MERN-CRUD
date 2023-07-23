import { combineReducers } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";

const rootReducer = combineReducers({
    user: userSliceReducer,
});

export default rootReducer;
