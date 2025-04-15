const { Router } = require("express");
const { userModel } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  // logic to sign up user
  try {
    const { email, firstName, lastName, password } = req.body;
    if (!email || !firstName || !lastName || !password) {
      return res.status(400).json("All fields are required");
    }
    const existedUser = await userModel.findOne({ email });
    if (existedUser) {
      return res.status(400).json("User already exist with this email");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
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

userRouter.post("/login", async (req, res) => {
  // logic to log in user
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const isPassWord = await bcrypt.compare(password, user.password);
    if (!isPassWord) {
      return res.status(400).json("Password is wrong");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_USER);
    return res.json({ token: token });
  } catch (error) {
    console.log(error, "Login error");
  }
});

userRouter.get("/users/courses", (req, res) => {
  // logic to list all courses
});

userRouter.post("/users/courses/:courseId", (req, res) => {
  // logic to purchase a course
});

userRouter.get("/users/purchasedCourses", (req, res) => {
  // logic to view purchased courses
});

module.exports = userRouter;
