import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import {
  saveOrPublishCourse,
  getCourses,
  deleteCourse,
  updateCourse,
  getCourse,
  editCourseContent,
} from "./course.controller";
import { verifyAuthor } from "../blog/blog.middleware";
import { verifyAccessTokenMiddleware } from "../auth/auth.middleware";
const CourseRouter = express.Router();

export const courseRouter = CourseRouter.post(
  "/publish",
  catchAsync(verifyAuthor),
  catchAsync(saveOrPublishCourse)
)
  .get("/courses", verifyAccessTokenMiddleware, catchAsync(getCourses))
  .delete(
    "/course/:slug",
    verifyAccessTokenMiddleware,
    catchAsync(deleteCourse)
  )
  .put("/update", verifyAccessTokenMiddleware, catchAsync(updateCourse))
  .get("/course/:slug", verifyAccessTokenMiddleware, catchAsync(getCourse))
  .put(
    "/updatecontent/:slug",
    verifyAccessTokenMiddleware,
    catchAsync(editCourseContent)
  );
