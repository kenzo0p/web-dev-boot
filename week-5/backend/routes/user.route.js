//  start writing your code from here
import { Router } from "express";
import { login, registerUser } from "../controllers/user.controller.js";


const router = Router();


router.route("/signup").post( registerUser)
router.route("/login").post( login)

export default router;