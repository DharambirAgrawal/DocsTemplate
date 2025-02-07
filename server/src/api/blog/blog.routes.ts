import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import {
  saveOrPublishPost,
  getAllPosts
} from "./post.controller"
import { getPublicPosts } from "./public.controller";
import { verifyAccessTokenMiddleware } from "../auth/auth.middleware";

import { verifyAuthor } from "./blog.middleware";
const BlogRouter = express.Router();

export const blogRouter = BlogRouter
.post("/publish",catchAsync(verifyAuthor),  catchAsync(saveOrPublishPost))
.get("/posts",verifyAccessTokenMiddleware,catchAsync(getAllPosts))
.get("/posts",catchAsync(getPublicPosts))

