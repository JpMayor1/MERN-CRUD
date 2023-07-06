const { Router } = require("express");

const todoRouter = Router();

const {
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo,
} = require("../controllers/todoController");

// Todo Routes
todoRouter.post("/todos/add", addTodo);
todoRouter.get("/todos/:userId", getTodo);
todoRouter.put("/todos/update/:_id", updateTodo);
todoRouter.delete("/todos/delete/:_id", deleteTodo);

module.exports = todoRouter;
