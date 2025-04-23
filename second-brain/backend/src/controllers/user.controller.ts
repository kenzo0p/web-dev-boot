import { UserModel } from "../models/user.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.create({
      username: username,
      password: password,
    });
    res.json({ message: "User signed up" });
  } catch (error) {
    console.log(error, "Error while registering the user");
    res.status(500).json("Internal server error");
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username , password });
    if (!user) {
      res.status(403).json("Incorrect creadentials");
    }

    const token = jwt.sign({ id: user!._id }, "sduudusud");

    res.json({ message: "User logged in "  , token : token});
  } catch (error) {
    console.log(error, "Error while login the user");
  }
};
export { registerUser, login };
