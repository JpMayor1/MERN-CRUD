const { Router } = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");

const todoRouter = Router();

const {
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo,
} = require("../controllers/todoController");

// Todo Routes
todoRouter.post("/todos/add", isLoggedIn, addTodo);
todoRouter.get("/todos/:todoId", isLoggedIn, getTodo);
todoRouter.put("/todos/update/:_id", isLoggedIn, updateTodo);
todoRouter.delete("/todos/delete/:_id", isLoggedIn, deleteTodo);

module.exports = todoRouter;
