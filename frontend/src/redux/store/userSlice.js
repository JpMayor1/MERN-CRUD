// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: "",
        token: "",
        todoId: "",
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = String(action.payload);
        },
        setToken: (state, action) => {
            state.token = String(action.payload);
        },
        setTodoId: (state, action) => {
            state.todoId = String(action.payload);
        },
        logoutUser: (state) => {
            state.username = "";
            state.token = "";
            state.todoId = "";
        },
    },
});

export const { setUsername, setToken, logoutUser, setTodoId } = userSlice.actions;
export default userSlice.reducer;
