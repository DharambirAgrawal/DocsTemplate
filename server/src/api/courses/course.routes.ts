import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import { saveorPublishCourse } from "./course.controller";
import { verifyAuthor } from "../blog/blog.middleware";
const CourseRouter = express.Router();

export const courseRouter = CourseRouter.post(
  "/publish",
  catchAsync(verifyAuthor),
  catchAsync(saveorPublishCourse)
);
//   .get("/posts", verifyAccessTokenMiddleware, catchAsync(getAllPosts))
//   .get("/post/:slug", verifyAccessTokenMiddleware, catchAsync(getPostContent))

//   //public route
//   .get("/public/posts", catchAsync(getAdvancedPosts))
//   .get("/public/posts/:slug", catchAsync(getPublicPostcontent))
//   .get("/public/categories", catchAsync(getCategories))
//   .get("/public/tags", catchAsync(getTags))
//   .get("/public/allposts", catchAsync(getPublicAllPosts));
