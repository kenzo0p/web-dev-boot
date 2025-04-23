import { Request, Response } from "express";
import { ContentModel } from "../models/content.model";

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


export const getContents = async(req  :Request , res : Response) : Promise<void> => {
    try {
        //@ts-ignore
        const userId = req.userId;
        const content = await ContentModel.find({userId}).populate("userId" ,"username")
        res.json({content});
    } catch (error) {
        console.log(error , "Error while getting the user contents")
    }
}
export const deleteContents = async (req: Request, res: Response): Promise<void> => {
    try {
        //@ts-ignore
        const userId = req.userId;
        const contentId = req.body.contentId;

        const result = await ContentModel.deleteOne({ _id: contentId, userId });

        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Content not found or not authorized to delete" });
        } else {
            res.json({ message: "Content deleted" });
        }
    } catch (error) {
        console.log(error, "Error while deleting contents");
        res.status(500).json({ message: "Internal server error" });
    }
};