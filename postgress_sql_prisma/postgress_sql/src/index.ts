import  {Client} from "pg"
import express from "express"

const app = express();
app.use(express.json())
const pgClient = new Client({
    user : "neondb_owner",
    password : "npg_oDT8sc0buUgO",
    host : "ep-small-flower-a454mgtg-pooler.us-east-1.aws.neon.tech",
    port : 5432,
    database : "neondb",
    ssl: true,
    
})
pgClient.connect()

app.post("/signup", async(req, res) => {
    const {username,email  ,password} = req.body;


    //to avoid sql injection we can use parameterized queries or prepared statements
    // const insertQuery =`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;



    const insertQuery =`INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`;
    const values = [username, email, password];
    const response = await pgClient.query(insertQuery, values);
    res.status(201).json({message : "User created successfully", user: response.rows[0]});
});


// async function main(){
//     await pgClient.connect();
//     const res = await pgClient.query("SELECT * FROM users;");
//     console.log(res.rows)
// }




// main().catch((err) => {
//     console.error(err);
// }).finally(() => {
//     pgClient.end();
// })

app.get("/users", async(req, res) => {
    const response = await pgClient.query("SELECT * FROM users;")
    res.status(200).json({message : "Users fetched successfully", users: response.rows});
})



app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

