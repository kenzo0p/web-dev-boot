import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDb from "./db/index.js";
import userRoute from "./routes/user.route.js";
import todoRoute from "./routes/todo.route.js";
const app = express();
const PORT = process.env.PORT;

//express middlewars
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/users", userRoute);
app.use("/todos", todoRoute);

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server runnning on : http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("MONGODB CONNECTION FAILED!!!", err));
