import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import {
  saveOrPublishPost,
  getAllPosts,
  getPostContent,
} from "./post.controller";
import {
  getAdvancedPosts,
  getPublicAllPosts,
  getPublicPostcontent,
} from "./public.controller";
import { verifyAccessTokenMiddleware } from "../auth/auth.middleware";
import { getCategories } from "./categories.controller";
import { verifyAuthor } from "./blog.middleware";
import { getTags } from "./tags.controller";
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
  .get("/public/categories", catchAsync(getCategories))
  .get("/public/tags", catchAsync(getTags))
  .get("/public/allposts", catchAsync(getPublicAllPosts));
