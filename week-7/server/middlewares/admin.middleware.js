const jwt = require("jsonwebtoken");

const adminMiddleware = async (req, res , next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      res.status(401).json({ Message: "Token is expired" });
    }
    const decodeToken = jwt.verify(token , process.env.JWT_SECRET_ADMIN);
    req.adminId = decodeToken._id;
    next();
  } catch (error) { 
    console.log(error);
    return res.status(500).json("Internal server error || You are not signed in")
  }
};

module.exports = {adminMiddleware};