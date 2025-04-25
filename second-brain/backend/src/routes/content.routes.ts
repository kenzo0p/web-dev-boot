import { Router } from "express";
import { createContent, deleteContents, getContents, shareContent, shareLink } from "../controllers/content.controller";
import { UserMiddleware } from "../middlewares/middleware";

const contentRouter = Router()


contentRouter.route("/").post(UserMiddleware, createContent)
contentRouter.route("/").get(UserMiddleware, getContents)
contentRouter.route("/").delete(UserMiddleware, deleteContents)
contentRouter.route("/brain/share").post(UserMiddleware ,shareContent)
contentRouter.route("/brain/share/:shareLink").post(UserMiddleware ,shareLink)


export default contentRouter