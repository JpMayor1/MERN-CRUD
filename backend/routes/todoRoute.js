const { Router } = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");

const todoRouter = Router();

const {
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo,
    updateTodoCompleted,
} = require("../controllers/todoController");

// Todo Routes
todoRouter.post("/todos/add", isLoggedIn, addTodo);
todoRouter.get("/todos/:todoId", isLoggedIn, getTodo);
todoRouter.put("/todos/update/:_id", isLoggedIn, updateTodo);
todoRouter.put("/todos/update/completed/:_id", isLoggedIn, updateTodoCompleted);
todoRouter.delete("/todos/delete/:_id", isLoggedIn, deleteTodo);

module.exports = todoRouter;
