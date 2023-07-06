const { Router } = require("express");

const userRouter = Router();

const {
    getAllUsers,
    loginUser,
    registerUser,
    deleteUser,
} = require("../controllers/authController");

// User Routes
userRouter.get("/users", getAllUsers);
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.delete("/delete/:id", deleteUser);

module.exports = userRouter;
