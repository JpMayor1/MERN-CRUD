import { combineReducers } from "@reduxjs/toolkit";
import todoSliceReducer from "./todoSlice";
import userSliceReducer from "./userSlice";

const rootReducer = combineReducers({
    todo: todoSliceReducer,
    user: userSliceReducer,
});

export default rootReducer;
