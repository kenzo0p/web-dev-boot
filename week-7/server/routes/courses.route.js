const {Router}  = require("express");
const courseRouter = Router();

courseRouter.post("/course/purchase", (req, res) => {});
courseRouter.post("/course/preview", (req, res) => {});

module.exports = courseRouter;