import { Router } from "express";
import { createContent, deleteContents, getContents } from "../controllers/content.controller";
import { UserMiddleware } from "../middlewares/middleware";

const contentRouer = Router()


contentRouer.route("/").post(UserMiddleware, createContent)
contentRouer.route("/").get(UserMiddleware, getContents)
contentRouer.route("/").delete(UserMiddleware, deleteContents)


export default contentRouer