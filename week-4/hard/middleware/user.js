import jwt from "jsonwebtoken"
import { TokenBlacklist } from "../database/index.js";

async function userMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
    
        // Check if token is blacklisted
        const blacklisted = await TokenBlacklist.findOne({ token });
        if (blacklisted) {
            return res.status(401).json({ message: "Token has been revoked" });
        }
    
        // Verify token
        const decoded = jwt.verify(token, "ombhor");
        
        // Check token expiration
        if (Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({ message: "Token has expired" });
        }
        
        req.userId = decoded.userId;
        req.token = token; // Store token for logout
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token has expired" });
        }
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default userMiddleware;