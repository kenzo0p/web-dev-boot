"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const db_1 = require("./db/db");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const content_routes_1 = __importDefault(require("./routes/content.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1/users", user_routes_1.default);
app.use("/api/v1/content", content_routes_1.default);
// app.get("api/v1/content" , (req , res) => {
// })
// app.delete("/api/v1/content" ,(req , res) => {
// })
// app.post("/api/v1/brain/share" , (req ,res) => {
// })
// app.get("/api/v1/brain/:shairLink" , (req , res) => {
// })
app.listen(3000, () => {
    (0, db_1.connectDb)();
    console.log("3000");
});
