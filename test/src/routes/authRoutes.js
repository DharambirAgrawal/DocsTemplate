import express from "express";

import {
  register,
  login,
  logout,
  verifyToken,
  getUsers,
} from "../controllers/authController.js";
import { checkBlogApiKey } from "../middleware/publicMiddleware.js";
const AuthRouter = express.Router();

export const authRouter = AuthRouter.post("/login", checkBlogApiKey, login)
  .get("/verify", checkBlogApiKey, verifyToken)
  .get("/logout", checkBlogApiKey, logout)
  .get("/users", checkBlogApiKey, getUsers);
// .post("/register", register);
// .get("/user/:email", checkUserMiddleware, getUser);
