import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient";

const registerUser = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const { username, password } = request.body;
    if (!username || !password) {
      return response.status(403).json("Provide all inputs");
    }

    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    });
    if (existingUser) {
      return response.status(402).json("User already exist");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashPassword,
      },
    });

    if (!newUser) {
      return response.status(404).json("Failed to signup");
    }

    return response.status(201).json("User signup successfully");
  } catch (error) {
    console.error("Something went wrong in register user", error);
    return response.status(500).json("Internal server error");
  }
};

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const  {username , password} = req.body;
    if(!username || !password) {
        return res.status(400).json("All fields are required");
    }

    const foundUser = await prisma.user.findUnique({where : {username : username}});
    if(!foundUser){
        return res.status(400).json("user is not registered please registered first");
    }

    const isPasswordCorrect = await bcrypt.compare(password , foundUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json("Password is incorrect");
    }

    const token = jwt.sign(username , "secretkey");
    return res.status(201).json({token : token , message  : "User logged in successfully"});
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
};

export { registerUser , login };
