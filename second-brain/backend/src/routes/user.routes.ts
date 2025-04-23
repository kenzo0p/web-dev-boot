import { Router } from "express";
import { login, registerUser } from "../controllers/user.controller";

const userRouter = Router();


userRouter.route("/signup").post(registerUser);
userRouter.route("/signin").post(login);

export default userRouter;