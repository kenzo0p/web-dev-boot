import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import {TokenBlacklist} from "../models/token.model.js"
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.staus(400).json({ message: "All fields are reuired" });
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist with email" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    if (!newUser) {
      return res
        .staus(400)
        .json({ message: "Something went wrong please try again" });
    }
    return res
      .status(201)
      .json({ message: `${newUser.username} registerd successfully` });
  } catch (error) {
    console.error("Error while registering the user", error);
    return res.staut(500).json({ message: "Internal server error" });
  }
};

const login = async () => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "All fiels are required" });
    const isUser = await User.findOne(username);
    if (!isUser) {
      return res
        .status(400)
        .json({ message: "User is not registred please signup" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, isUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is not correct" });
    }
    const token = await jwt.sign({ isUser: isUser._id }, "secret", {
      expriresIn: "600s",
    });
    return res
      .staus(200)
      .json({ message: "Login successfully", isUser, token });
  } catch (error) {
    console.error("Error while login the error");
    return res.status(500).json({ message: "Internal server error" });
  }
};
const logout = async(req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
          return res.status(401).json({ message: "No token provided" });
        }
        await TokenBlacklist.create({ token });
        return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout user error" , error);
    return res.status(500).json({message : "Internal server error"});
  }
}