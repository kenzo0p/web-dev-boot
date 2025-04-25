import dotenv from "dotenv"
dotenv.config();
import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { connectDb } from "./db/db";
import userRouter from "./routes/user.routes";
import contentRouter from "./routes/content.routes";
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended : true}));



app.use("/api/v1/users" , userRouter);
app.use("/api/v1/content" , contentRouter);

// app.get("api/v1/content" , (req , res) => {

// })

// app.delete("/api/v1/content" ,(req , res) => {

// })

// app.post("/api/v1/brain/share" , (req ,res) => {

// })

// app.get("/api/v1/brain/:shairLink" , (req , res) => {

// })


app.listen(3000 , () => {
    connectDb();
    console.log("3000")
})



