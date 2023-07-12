const { Router } = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");

const userRouter = Router();

const { loginUser, registerUser } = require("../controllers/authController");
const { getUserInfo } = require("../controllers/userInfoController");

// User Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/user", isLoggedIn, getUserInfo);

module.exports = userRouter;
