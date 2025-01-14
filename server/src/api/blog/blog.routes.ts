import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import {
  saveOrPublishPost
} from "./post.controller"
const BlogRouter = express.Router();

export const blogRouter = BlogRouter.get("/server",  catchAsync(saveOrPublishPost))

