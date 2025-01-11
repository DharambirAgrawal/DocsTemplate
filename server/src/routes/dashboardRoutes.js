import express from "express";

import {
  savePost,
  publishPost,
  getPosts,
  getPostcontent,
  saveImageData,
  getImages,
  deleteImage,
  UpdateImageData,
  getCategories,
  getTags,
  getRecentPosts,
} from "../controllers/dashboardController.js";
import { checkCookiesMiddleware } from "../middleware/authMiddleware.js";
const PostRouter = express.Router();

export const postRouter = PostRouter.post(
  "/savepost",
  checkCookiesMiddleware,
  savePost
)
  .post("/publishpost", checkCookiesMiddleware, publishPost)
  .post("/upload/images", checkCookiesMiddleware, saveImageData)
  .post("/update/image", checkCookiesMiddleware, UpdateImageData)
  .post("/delete/image", checkCookiesMiddleware, deleteImage)
  .get("/images/get", checkCookiesMiddleware, getImages)
  .get("/getpostcontent/:slug", checkCookiesMiddleware, getPostcontent)
  .get("/gettags", checkCookiesMiddleware, getTags)
  .get("/getcategories", checkCookiesMiddleware, getCategories)
  .get("/getrecentposts", getRecentPosts)
  .get("/getposts", checkCookiesMiddleware, getPosts);
