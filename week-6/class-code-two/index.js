import express from "express";
import jwt from "jsonwebtoken";
import { auth } from "./middlewares/auth.middleware.js"; // Ensure this middleware validates the token properly
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//if someone come to this code and  see JWT_SECRET dont be a cool guy to upload on twitter its just practice thing
export const JWT_SECRET = "dsjvjvjvnvcdnjwvbbvbvb";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

function logger(req, res, next) {
  console.log(req.method);
  next();
}

/*
 [
    {
    username : "om",
    password : "123445" , 
    token : "kfjbvkjbfdsvjkkdf.ksdbvjv.sdlovnisnvsdvlmdlmlmd8w6"
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
      success: true,
      token: token,
      user: {
        username: foundUser.username
      }
    });
  } else {
    res
      .status(403)
      .send({
        message: "Invalid username or password or please create the account",
      });
  }
});

app.get("/", logger, (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.get("/me", auth, (req, res) => {
  const user = req.user; //jwt
  let foundUser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === user.username) {
      foundUser = users[i];
    }
  }
  if (foundUser) {
    res.json({
      success: true,
      user: {
        username: foundUser.username,
        password: foundUser.password
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
});

const PORT = 3000;
app.listen(PORT);
