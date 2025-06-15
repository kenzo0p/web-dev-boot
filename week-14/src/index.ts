import express from "express"
import cors from "cors"
import userRouter from "./controllers/routes/user.routes"
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}));



//routes

app.use("/api/v1/user/" , userRouter);

app.get("/" , (req  , res) => {
    res.send("Welcome")
})


app.listen(8000 , () => {
    console.log("8000");
})