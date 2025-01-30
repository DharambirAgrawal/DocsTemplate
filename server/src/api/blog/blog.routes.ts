import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import {
  saveOrPublishPost,
  getAllPosts
} from "./post.controller"

import { verifyAuthor } from "./blog.middleware";
const BlogRouter = express.Router();

export const blogRouter = BlogRouter
.post("/publish",catchAsync(verifyAuthor),  catchAsync(saveOrPublishPost))
.get("/posts",catchAsync(verifyAuthor),catchAsync(getAllPosts))

