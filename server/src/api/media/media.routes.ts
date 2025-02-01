import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import { saveImageData, getImages, deleteImage, updateImageData } from "./image.controller";
import { verifyAccessTokenMiddleware } from "../auth/auth.middleware";

const MediaRouter = express.Router();

export const mediaRouter = MediaRouter
.post("/upload-image",verifyAccessTokenMiddleware,catchAsync(saveImageData))
.put("/update-image", verifyAccessTokenMiddleware, catchAsync(updateImageData))
.get("/images",verifyAccessTokenMiddleware,catchAsync(getImages))
.delete("/delete-image",verifyAccessTokenMiddleware,catchAsync(deleteImage))


