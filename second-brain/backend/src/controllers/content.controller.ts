import { Request, Response } from "express";
import { ContentModel } from "../models/content.model";
import { LinkModel } from "../models/link.model";
import { randomHash } from "../utils";
import { UserModel } from "../models/user.model";

export const createContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { link, type } = req.body;
    await ContentModel.create({
      link,
      type,
      //@ts-ignore
      userId: req.userId,
      tags: [],
    });

    res.json("Content created");
  } catch (error) {
    console.log(error, "Error while creating the content");
  }
};

export const getContents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({ userId }).populate(
      "userId",
      "username"
    );
    res.json({ content });
  } catch (error) {
    console.log(error, "Error while getting the user contents");
  }
};
export const deleteContents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //@ts-ignore
    const userId = req.userId;
    const contentId = req.body.contentId;

    const result = await ContentModel.deleteOne({ _id: contentId, userId });

    if (result.deletedCount === 0) {
      res
        .status(404)
        .json({ message: "Content not found or not authorized to delete" });
    } else {
      res.json({ message: "Content deleted" });
    }
  } catch (error) {
    console.log(error, "Error while deleting contents");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const shareContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const share = req.body.share;
    if (share) {
      const hash = randomHash(10);
      await LinkModel.create({
        //@ts-ignore
        userId: req.userId,
        hash: hash,
      });
      res.json({ message : hash });
    } else {
      //@ts-ignore
      await LinkModel.deleteOne({ userId: req.userId });
      res.json({ message: "Removed Link" });
    }
  } catch (error) {}
};

export const shareLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({ hash: hash });

    if (!link) {
      res.status(411).json({ message: "sorry incorrect input" });
      return;
    }
    //userId
    const content = await ContentModel.find({ userId: link?.userId });

    const user = await UserModel.findOne({
      _id: link?.userId,
    });

    res.json({ username: user?.username, content: content });
  } catch (error) {}
};
