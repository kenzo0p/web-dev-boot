const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const UserRoute = require("./routes/user.js");
const TodoRoute = require("./routes/todo.js");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/healthy", (req, res) => res.send("I am Healthy"));

//  start writing your routes here
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/todos", TodoRoute);

app.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);
