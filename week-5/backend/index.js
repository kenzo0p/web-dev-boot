import dotenv from "dotenv"
dotenv.config();
import express from "express"
import connectDb from "./db/index.js";
const app = express();
const PORT = process.env.PORT;

//express middlewars
app.use(express.json());
app.use(express.urlencoded({extended:true}));



connectDb().then(() =>{
    app.listen(PORT , ()=>{
        console.log(`http://localhost:${PORT}`)
    })
}).catch((err) => console.log("MONGODB CONNECTION FAILED!!!",err))