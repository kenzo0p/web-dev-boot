import jwt from 'jsonwebtoken';
import { TokenBlacklist } from '../models/token.model.js';

async function userMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Authorization header must start with Bearer" });
        }

        const token = authHeader.split(' ')[1];
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
        req.userId = decoded.userId;
        req.token = token;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token has expired" });
        }
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default userMiddleware;