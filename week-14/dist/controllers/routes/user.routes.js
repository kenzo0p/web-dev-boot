"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../user.controller");
const userRouter = (0, express_1.Router)();
userRouter.route("/signup").post(user_controller_1.registerUser);
userRouter.route("/login").post(user_controller_1.login);
exports.default = userRouter;
