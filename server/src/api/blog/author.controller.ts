import Author from "../../models/blog/AuthorModel"
import { AppError } from "../../errors/AppError";
import { Request, Response } from "express";

export const createAuthor = async (req: Request, res: Response) => {
    
const userId  = (req as any).userId;

    if(!userId){
        throw new AppError("Invalid request", 401);
    }

    const author = new Author({
        userId: userId,
    });

    await author.save();
    if(!author){
        throw new AppError("Error while creating author", 400);
    }


    return res.status(200).json({
        status: "success",
        message: "Author created successfully",
    });

}