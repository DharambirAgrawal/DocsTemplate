import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import {
  saveOrPublishCourse,
  getCourses,
  deleteCourse,
  updateCourse,
  getCourse,
  updateGroup,
} from "./course.controller";
import { uploadCourseContent } from "./content.controller";
import { verifyAuthor } from "../blog/blog.middleware";
import { verifyAccessTokenMiddleware } from "../auth/auth.middleware";
import {
  deleteContent,
  updateCourseContent,
  updateContentOrder,
} from "./content.controller";
import {
  getPublicCourse,
  getPublicCourses,
  getAllCourses,
} from "./public.controller";
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
    "/publishcontent/:slug",
    verifyAccessTokenMiddleware,
    catchAsync(uploadCourseContent)
  )
  .delete(
    "/deletecontent/:id",
    verifyAccessTokenMiddleware,
    catchAsync(deleteContent)
  )
  .put("/updategroup", verifyAccessTokenMiddleware, catchAsync(updateGroup))
  .put(
    "/updatecontent/:id",
    verifyAccessTokenMiddleware,
    catchAsync(updateCourseContent)
  )
  .put(
    "/updatecontentorder",
    verifyAccessTokenMiddleware,
    catchAsync(updateContentOrder)
  )
  .get("/public/courses", catchAsync(getPublicCourses))
  .get("/public/:slug", catchAsync(getPublicCourse))
  .get("/public/courses/all", catchAsync(getAllCourses));
