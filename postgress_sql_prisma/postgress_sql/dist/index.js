"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const pgClient = new pg_1.Client({
    user: "neondb_owner",
    password: "npg_oDT8sc0buUgO",
    host: "ep-small-flower-a454mgtg-pooler.us-east-1.aws.neon.tech",
    port: 5432,
    database: "neondb",
    ssl: true,
});
pgClient.connect();
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`;
    const values = [username, email, password];
    const response = yield pgClient.query(insertQuery, values);
    res.status(201).json({ message: "User created successfully", user: response.rows[0] });
}));
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
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
