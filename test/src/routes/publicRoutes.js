import express from "express";

import {
  getPosts,
  getPostcontent,
  getCategories,
} from "../controllers/publicBlogController.js";

import {
  subscribeUser,
  unSubscribeUser,
} from "../controllers/userController.js";

import { checkBlogApiKey } from "../middleware/publicMiddleware.js";

import {
  getMetaKeywords,
  getPostSlugs,
  getPostCategories,
  getSpecificPostMetadata,
  getPostMetaData,
} from "../controllers/publicMetaDataController.js";
const PublicBlogRouter = express.Router();
const PublicRouter = express.Router();
const MetaDataRouter = express.Router();

export const publicRouter = PublicRouter.get(
  "/unsubscribe/:token",
  checkBlogApiKey,
  unSubscribeUser
).post("/subscribe", checkBlogApiKey, subscribeUser);

export const publicBlogRouter = PublicBlogRouter.get(
  "/posts/:slug",
  checkBlogApiKey,
  getPostcontent
)
  .get("/categories", checkBlogApiKey, getCategories)
  .get("/posts", checkBlogApiKey, getPosts);

export const metaDataRouter = MetaDataRouter.get(
  "/getMetaKeywords",
  checkBlogApiKey,
  getMetaKeywords
)
  .get("/slugs", checkBlogApiKey, getPostSlugs)
  .get("/categories", checkBlogApiKey, getPostCategories)
  .get("/posts/:slug", checkBlogApiKey, getSpecificPostMetadata)
  .get("/posts", checkBlogApiKey, getPostMetaData);
