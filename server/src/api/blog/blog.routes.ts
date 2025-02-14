import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import {
  saveOrPublishPost,
  getAllPosts,
  getPostContent,
  getCategories,
} from "./post.controller";
import { getAdvancedPosts, getPublicPostcontent } from "./public.controller";
import { verifyAccessTokenMiddleware } from "../auth/auth.middleware";

import { verifyAuthor } from "./blog.middleware";
const BlogRouter = express.Router();

export const blogRouter = BlogRouter.post(
  "/publish",
  catchAsync(verifyAuthor),
  catchAsync(saveOrPublishPost)
)
  .get("/posts", verifyAccessTokenMiddleware, catchAsync(getAllPosts))
  .get("/post/:slug", verifyAccessTokenMiddleware, catchAsync(getPostContent))

  //public route
  .get("/public/posts", catchAsync(getAdvancedPosts))
  .get("/public/posts/:slug", catchAsync(getPublicPostcontent))
  .get("/public/categories", catchAsync(getCategories));
