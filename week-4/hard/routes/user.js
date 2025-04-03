const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user.js");
const { User } = require("../database.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { TokenBlacklist, Todo } = require("../database/index.js");
// User Routes
router.post("/signup", async (req, res) => {
  try {
    // Implement user signup logic
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(404).json({ message: "All Fieds are requied" });
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({
          message:
            "User already exist with this email please kindly login or you are trying access another person 😅",
        });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    const token = jwt.sign({ userId: newUser._id }, "ombhor", {
      expiresIn: "600s",
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", newUser, token });
  } catch (error) {
    console.log(error, "SIGNUP");
    return res.status(500).json("Internal server error");
  }
});

router.post("/login", async (req, res) => {
  // Implement user login logic
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password is required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json("Password is incorrect");
    }

    const token = jwt.sign({ userId: user._id }, "ombhor", {
      expiresIn: "600s",
    });
    return res
      .status(200)
      .json({ message: "user login successfully", token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/todos", userMiddleware, async (req, res) => {
  // Implement logic for getting todos for a user
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    const todo = await Todo.find({ userId });
    if (todo.length === 0) {
      return res
        .status(404)
        .json({ message: "You don't have todos yet please add a new todo" });
    }
    return res.status(200).json({ todo });
  } catch (error) {
    console.log("Error while getting the all todos of user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/logout", userMiddleware, async (req, res) => {
  // Implement logout logic
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    await TokenBlacklist.create({ token });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("LOGOUT ERROR", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
