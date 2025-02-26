import express from "express";
import { catchAsync } from "../../errors/catchAsync";
// import { testServer, test, transfer_data } from "./testController";
import { testServer } from "./testController";

const TestRouter = express.Router();

export const testRouter = TestRouter.get("/server", catchAsync(testServer));
// .get("/transfer", catchAsync(transfer_data))
// .get("/test", catchAsync(test));
