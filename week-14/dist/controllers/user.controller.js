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
exports.login = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = require("../prismaClient");
const registerUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = request.body;
        if (!username || !password) {
            return response.status(403).json("Provide all inputs");
        }
        const existingUser = yield prismaClient_1.prisma.user.findUnique({
            where: { username: username },
        });
        if (existingUser) {
            return response.status(402).json("User already exist");
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield prismaClient_1.prisma.user.create({
            data: {
                username: username,
                password: hashPassword,
            },
        });
        if (!newUser) {
            return response.status(404).json("Failed to signup");
        }
        return response.status(201).json("User signup successfully");
    }
    catch (error) {
        console.error("Something went wrong in register user", error);
        return response.status(500).json("Internal server error");
    }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json("All fields are required");
        }
        const foundUser = yield prismaClient_1.prisma.user.findUnique({ where: { username: username } });
        if (!foundUser) {
            return res.status(400).json("user is not registered please registered first");
        }
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, foundUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json("Password is incorrect");
        }
        const token = jsonwebtoken_1.default.sign(username, "secretkey");
        return res.status(201).json({ token: token, message: "User logged in successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
});
exports.login = login;
