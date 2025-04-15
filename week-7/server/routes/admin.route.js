const { Router } = require("express");
const { adminModel } = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middlewares/admin.middleware");
const { courseModel } = require("../models/course.model");
const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    if (!email || !firstName || !lastName || !password) {
      return res.status(400).json("All fields are required");
    }
    const existedUser = await adminModel.findOne({ email });
    if (existedUser) {
      return res.status(400).json("User already exist with this email");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await adminModel.create({
      email,
      firstName,
      lastName,
      password: hashPassword,
    });
    if (!newUser) {
      return res.status(400).json("Something went wrong");
    }
    return res
      .status(201)
      .json({ newUser, Message: "User created successfulyy" });
  } catch (error) {
    console.log(error, "Error while signup user");
    return res.status(500).json("Internal server error");
  }
});

adminRouter.post("/login", async (req, res) => {
  // logic to log in user
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });
    const isPassWord = await bcrypt.compare(password, admin.password);
    if (!isPassWord) {
      return res.status(400).json("Password is wrong");
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_ADMIN);
    return res.json({ token: token });
  } catch (error) {
    console.log(error, "Login error");
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminID = req.adminId;
  const { title, description, imageUrl, price } = req.body;
  const course = await courseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorId: adminID,
  });
  res.json({
    message: "Course created",
    courseId: course._id,
  });
  // logic to create a course
});

adminRouter.put("/course/:courseId", adminMiddleware, async (req, res) => {
  // logic to edit a course

  const adminID = req.adminId;
  const { courseId } = req.params;
  const { title, description, imageUrl, price } = req.body;
  const course = await courseModel.updateOne(
    { _id: courseId, creatorId: adminID },
    {
      title,
      description,
      imageUrl,
      price,
    }
  );
 
  res.json({
    message: "Course updated",
    courseId: course._id,
  });
});

adminRouter.get("/courses", adminMiddleware, async (req, res) => {
  // logic to get all courses
  const adminId = req.adminId;
  const courses = await courseModel.find({ adminId });
  res.json(courses);
});

module.exports = adminRouter;
