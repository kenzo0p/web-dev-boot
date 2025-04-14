const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res , next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ Message: "Unauthorized" });
    }
    const decodeToken = jwt.verify(token , process.env.JWT_SECRET);
    red.id = decodeToken._id;
  } catch (error) {
    console.log(error);
    return res.status(500).json("Token expired")
  }
};

module.exporta = {authMiddleware};