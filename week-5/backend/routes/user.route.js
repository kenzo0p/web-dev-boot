//  start writing your code from here
import { Router } from "express";
import { login, logout, registerUser } from "../controllers/user.controller.js";
import userMiddleware from "../middleware/user.js";


const router = Router();


router.route("/signup").post( registerUser)
router.route("/login").post( login)
router.route("/logout").post( userMiddleware,logout)

export default router;