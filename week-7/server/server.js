const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const userRouter = require("./routes/user.route.js")
const courseRouter = require("./routes/courses.route.js")
const adminRouter = require("./routes/admin.route.js");
const connectDb = require("./db/db.js");

app.use(express.json());

const secret = process.env.JWT_SECRERT; // This should be in an environment variable in a real application
const port = process.env.PORT;



const authMiddleware = (req, res, next) => {
  //  authMiddleware logic here
};


~
app.use("/api/v1/users", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server runnning on : http://localhost:${port}`);
    });
  })
  .catch((err) => console.log("MONGODB CONNECTION FAILED!!!", err));
