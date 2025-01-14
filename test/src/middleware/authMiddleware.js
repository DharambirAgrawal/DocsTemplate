import asyncHandler from "express-async-handler";
import { AppError } from "../errors/AppError.js";
import { decodeToken } from "../utils/jwtUtils.js";
import { prisma } from "../../app.js";

// export const checkAdminRoleMiddleware = asyncHandler(async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) {
//     throw new AppError("Invalid request", 404);
//   }
//   const { email, role } = await decodeToken(
//     token,
//     process.env.JWT_TOKEN_SECRET
//   );
//   if (role !== "ADMIN") {
//     throw new AppError("Unauthorized", 401);
//   }
//   const existingUser = await prisma.user.findUnique({
//     where: { email: email, role: "ADMIN" }, // Use your unique field here, such as email
//   });

//   if (!existingUser) {
//     throw new AppError("Unauthorized", 401);
//   }
//   return next();
// });

// export const checkUserMiddleware = asyncHandler(async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) {
//     throw new AppError("Invalid request", 404);
//   }
//   const { email, role } = await decodeToken(
//     token,
//     process.env.JWT_TOKEN_SECRET
//   );
//   const existingUser = await prisma.user.findUnique({
//     where: { email: email }, // Use your unique field here, such as email
//   });
//   if (!existingUser) {
//     throw new AppError("Unauthorized", 401);
//   }
//   return next();
// });

export const checkCookiesMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new AppError("Invalid request", 404);
  }
  const { email, role, type } = await decodeToken(
    token,
    process.env.JWT_TOKEN_SECRET
  );
  const existingUser = await prisma.user.findUnique({
    where: { email: email }, // Use your unique field here, such as email
  });
  if (!existingUser || existingUser.role !== role || type !== "JWT") {
    throw new AppError("Unauthorized", 401);
  }
  req.user = {
    role: existingUser.role,
    id: existingUser.id,
    email: existingUser.email,
  };
  return next();
});
