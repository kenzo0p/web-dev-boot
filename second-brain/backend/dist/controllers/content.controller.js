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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContents = exports.getContents = exports.createContent = void 0;
const content_model_1 = require("../models/content.model");
const createContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, type } = req.body;
        yield content_model_1.ContentModel.create({
            link,
            type,
            //@ts-ignore
            userId: req.userId,
            tags: [],
        });
        res.json("Content created");
    }
    catch (error) {
        console.log(error, "Error while creating the content");
    }
});
exports.createContent = createContent;
const getContents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.userId;
        const content = yield content_model_1.ContentModel.find({ userId }).populate("userId", "username");
        res.json({ content });
    }
    catch (error) {
        console.log(error, "Error while getting the user contents");
    }
});
exports.getContents = getContents;
const deleteContents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.userId;
        const contentId = req.body.contentId;
        const result = yield content_model_1.ContentModel.deleteOne({ _id: contentId, userId });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Content not found or not authorized to delete" });
        }
        else {
            res.json({ message: "Content deleted" });
        }
    }
    catch (error) {
        console.log(error, "Error while deleting contents");
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteContents = deleteContents;
