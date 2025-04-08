import express from "express";
import jwt from "jsonwebtoken";
const app = express();
const JWT_SECRET = "dsjvjvjvnvcdnjwvbbvbvb";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
 [
    {
    username : "om",
    password : "123445" , 
    token : "kfjbvkjbfdsvjkkdf"
    }
 ]
*/
let users = [];

//random long string
// function generateToken() {
//   let options = [
//     "a",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "g",
//     "h",
//     "i",
//     "j",
//     "k",
//     "l",
//     "m",
//     "n",
//     "o",
//     "p",
//     "q",
//     "r",
//     "s",
//     "t",
//     "u",
//     "v",
//     "w",
//     "x",
//     "y",
//     "z",
//     "A",
//     "B",
//     "C",
//     "D",
//     "E",
//     "F",
//     "G",
//     "H",
//     "I",
//     "J",
//     "K",
//     "L",
//     "M",
//     "N",
//     "O",
//     "P",
//     "Q",
//     "R",
//     "S",
//     "T",
//     "U",
//     "V",
//     "W",
//     "X",
//     "Y",
//     "Z",
//     "0",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//   ];

//   let token = "";
//   for (let i = 0; i < 32; i++) {
//     // use a simple function here
//     token += options[Math.floor(Math.random() * options.length)];
//   }
//   return token;
// }
app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (users.find((u) => u.username === username)) {
    res.json({ message: "User already exist" });
  }
  users.push({
    username: username,
    password: password,
  });
  res.json({ message: "You signed in" });
  console.log(users);
});
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let foundUser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      foundUser = users[i];
    }
  }

  // const user = users.find(u => u.username === username && u.password === password)

  if (foundUser) {
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );
    res.json({
      message: token,
    });
    console.log(users);
  } else {
    res.status(403).send({ message: "Invalid username or password" });
  }
});

app.get("/me", (req, res) => {
  const token = req.headers?.token; //jwt
  const decodedInfo = jwt.verify(token, JWT_SECRET); // {username : "ombhor"}
  const username = decodedInfo.username
  let foundUser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      foundUser = users[i];
    }
  }
  if (foundUser) {
    res.json({ username: foundUser.username, password: foundUser.password });
  } else {
    res.json({
      message: "Token invalid",
    });
  }
});

const PORT = 3000;
app.listen(PORT);
