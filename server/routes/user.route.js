import express from "express";
import { registerUser, userLogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(userLogin);

export { userRouter };
