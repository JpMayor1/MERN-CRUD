const { Router } = require("express");

const userRouter = Router();

const { loginUser, registerUser } = require("../controllers/authController");

// User Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
