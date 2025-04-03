async function userMiddleware(req, res, next) {
    // Implement user auth logic
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
          return res.status(401).json({ message: "No token provided" });
        }
    
        // Check if token is blacklisted
        const blacklisted = await TokenBlacklist.findOne({ token });
        if (blacklisted) {
          return res.status(401).json({ message: "Token is invalid" });
        }
    
        // Verify token
        const decoded = jwt.verify(token, "ombhor");
        req.userId = decoded.userId;
        next();
      } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
}

module.exports = userMiddleware;