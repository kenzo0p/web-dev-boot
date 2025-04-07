import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
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
      .json({ message: `${newUser.username} registerd successfully`, newUser });
  } catch (error) {
    console.error("Error while registering the user", error);
    return res.staut(500).json({ message: "Somthing went wrong" });
  }
};
