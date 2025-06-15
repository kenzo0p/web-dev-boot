import { Router } from "express";
import { login, registerUser } from "../user.controller";

const userRouter  = Router();


userRouter.route("/signup").post(registerUser);
userRouter.route("/login").post(login);

export default userRouter;