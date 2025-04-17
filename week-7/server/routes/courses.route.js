const { Router } = require("express");
const { userMiddleware } = require("../middlewares/user.middleware");
const { purchaseModel } = require("../models/purchase.model");
const { courseModel } = require("../models/course.model");
const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;
  await purchaseModel.create({ userId, courseId });
  res.json({ message: "You have purchase course successfully" });
});
courseRouter.post("/preview", async (req, res) => {
  const courses = await courseModel.find({});
  res.json({ courses });
});
courseRouter.post("/purchases", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const purchases = await purchaseModel.find({ userId });
  const courseData = await courseModel.find({
    _id: { $in: purchases.map((x) => x.courseId) },
  });
  res.json({ purchases, courseData });
});

module.exports = courseRouter;
