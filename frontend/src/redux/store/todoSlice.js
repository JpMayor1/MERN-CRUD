import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    todos: [],
};

// Thunk for fetching todos
export const fetchTodos = createAsyncThunk(
    "todo/fetchTodos",
    async (todoId) => {
        const response = await axios.get(
            `http://localhost:5000/todos/${todoId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    }
);

// Thunk for adding new todo
export const addNewTodo = createAsyncThunk(
    "todo/addNewTodo",
    async ({ todoId, text }) => {
        // Changed the argument to an object

        const response = await axios.post(
            "http://localhost:5000/todos/add",
            {
                todoId,
                text,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    }
);
// Thunk for updating todo text
export const updateTodoText = createAsyncThunk(
    "todo/updateTodoText",
    async (updatedTodo) => {
        // Assuming `updatedTodo` has the fields: id, text, completed
        const response = await axios.put(
            `http://localhost:5000/todos/update/${updatedTodo.id}`,
            {
                text: updatedTodo.text,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    }
);

// Thunk for updating todo completed
export const updateTodoCompleted = createAsyncThunk(
    "todo/updateTodoCompleted",
    async (updatedTodo) => {
        // Assuming `updatedTodo` has the fields: id, text, completed
        const response = await axios.put(
            `http://localhost:5000/todos/update/completed/${updatedTodo.id}`,
            {
                completed: updatedTodo.completed,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    }
);

// Thunk for deleting todo
export const deleteTodo = createAsyncThunk(
    "todo/deleteTodo",
    async (todoId) => {
        await axios.delete(`http://localhost:5000/todos/delete/${todoId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return todoId;
    }
);

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        logoutUserTodo: (state) => {
            state.todos = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                // Append the new todo to the state
                const newTodo = action.payload;
                state.push(newTodo);
            })
            .addCase(updateTodoText.fulfilled, (state, action) => {
                // Update the specific todo with the updated text in the Redux store
                const updatedTodo = action.payload;
                state.todos = state.todos.map((todo) =>
                    todo.id === updatedTodo.id
                        ? { ...todo, text: updatedTodo.text }
                        : todo
                );
            })
            .addCase(updateTodoCompleted.fulfilled, (state, action) => {
                // Update the specific todo with the updated completed status in the Redux store
                const updatedTodo = action.payload;
                state.todos = state.todos.map((todo) =>
                    todo.id === updatedTodo.id
                        ? { ...todo, completed: updatedTodo.completed }
                        : todo
                );
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                // Remove the todo from the Redux store
                const todoId = action.payload;
                state.todos = state.todos.filter((todo) => todo.id !== todoId);
            });
    },
});

export const { logoutUserTodo } = todoSlice.actions;
export default todoSlice.reducer;
