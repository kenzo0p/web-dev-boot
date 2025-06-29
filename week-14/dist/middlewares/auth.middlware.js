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
exports.authMiddlware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddlware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json("Unauthorized: No token provided");
        }
        const decoded = jsonwebtoken_1.default.verify(token, "secretkey");
        if (!decoded) {
            return res.status(401).json("Unauthorized: Invalid token");
        }
        req.user = decoded; // Attach the decoded user information to the request object
        console.log("User authenticated:", req.user);
        next();
    }
    catch (error) {
        return res.status(500).json("Internal Server Error");
    }
});
exports.authMiddlware = authMiddlware;
