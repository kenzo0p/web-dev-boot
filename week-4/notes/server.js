import express from "express"
import chalk from "chalk"
import fs from "fs"
const app =  express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const todo = [{}];
app.get("/", (req, res) => {
  fs.readFile("a.txt" , "utf-8" , (err, data) => {
    if(err){
        res.send("Something went wrong");
    }
    res.send(data);
  })
});
app.post("/", (req, res) => {
  let todos = req.body;
  const todoString =JSON.stringify(todos);
  fs.writeFile("a.txt", todoString, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Failed to write to file");
    } else {
      res.status(201).json("Todo created successfully");
    }
  });
});
console.log(todo)

app.listen(3000, () => {
  console.log(chalk.blue(`App is listening in post http://localhost:${3000}/`));
});
