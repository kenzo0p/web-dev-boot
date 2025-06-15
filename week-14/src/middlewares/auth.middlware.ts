import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        username: string;
        role: "admin" | "user"; // Define the user property to hold the decoded token information
      };
    }
  }
}
export const authMiddlware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json("Unauthorized: No token provided");
    }
    const decoded = jwt.verify(token, "secretkey") as {
      id: number;
      username: string;
      role: "admin" | "user";
    };
    if (!decoded) {
      return res.status(401).json("Unauthorized: Invalid token");
    }
    req.user = decoded; // Attach the decoded user information to the request object
    console.log("User authenticated:", req.user);
    next();
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};



export const checkRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access forbidden' });
        }
        next();
    };
};
