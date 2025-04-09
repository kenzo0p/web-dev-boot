//  start writing your code from here
import {Router} from "express"
import userMiddleware from "../middleware/user.js";
import { createTodo, deleteTodo, getAllUserTodos, updateTodo } from "../controllers/todo.controller.js";

const router = Router();

router.route("/create").post(userMiddleware , createTodo)
router.route("/").get(userMiddleware , getAllUserTodos)
router.route("/update/:id").put(userMiddleware , updateTodo)
router.route("/delete/:id").post(userMiddleware , deleteTodo)




export default router;