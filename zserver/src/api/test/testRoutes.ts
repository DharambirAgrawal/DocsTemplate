import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import {
  testServer
} from "./testController"
const TestRouter = express.Router();

export const testRouter = TestRouter.get("/server",  catchAsync(testServer))

