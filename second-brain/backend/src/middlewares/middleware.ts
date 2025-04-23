import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
export const UserMiddleware = async(req :Request  , res : Response , next : NextFunction)  : Promise<void> => {
    const header = req.headers["authorization"];
    const decodedToken = jwt.verify(header as string , "sduudusud")
    if(decodedToken){
        //@ts-ignore
        req.userId = decodedToken.id;
        next();
    }else {
        res.status(403).json("You are not logged in");
    }

}