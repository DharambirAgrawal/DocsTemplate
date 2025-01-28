import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
import User from "../../models/auth/user.model";

// export const getAuthors = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const {
//     userId,
//     page = 1,
//     limit = 10,
//     sort = "createdAt",
//     filter = "",
//   } = req.query;

// const {role} = (req as any) ;


//   const select =
//     "firstName lastName accountStatus role createdAt updatedAt userId email image accountStatus isEmailVerified";

//   // If userId is provided in the params, find and return that specific user
//   if (userId) {
//     const user = await User.findOne({usetId:userId}).select(select);
//     if (!user) {
//       return next(new AppError("User not found", 404)); // Using custom error handler
//     }
//     return res.status(200).json({
//       status: "success",
//       data: user,
//     });
//   }

//   // Pagination logic
//   const pageNumber = parseInt(page as string);
//   const pageLimit = parseInt(limit as string);
//   const skip = (pageNumber - 1) * pageLimit;

//   const filterConditions = filter
//     ? { name: { $regex: filter, $options: "i" } }
//     : {};

//   // Ensure `sort` is a string and handle multiple values (e.g., array from query params)
//   const sortField = Array.isArray(sort) ? sort[0] : (sort as string);

//   if (typeof sortField !== "string") {
//     return next(new AppError("Invalid sort parameter", 400)); // Return a 400 error if `sort` is not a string
//   }

//   const sortConditions: { [key: string]: 1 | -1 } = { [sortField]: 1 };

//   // Fetch users with pagination, sorting, and only specific fields
//   const users = await User.find(filterConditions)
//     .skip(skip)
//     .limit(pageLimit)
//     .sort(sortConditions)
//     .select(select); // Only these fields will be returned

//   // Count total users for pagination
//   const totalUsers = await User.countDocuments(filterConditions);
//   const totalPages = Math.ceil(totalUsers / pageLimit);

//   // Respond with paginated data
//   return res.status(200).json({
//     status: "success",
//     data: users,
//     pagination: {
//       totalUsers,
//       totalPages,
//       currentPage: pageNumber,
//       pageLimit,
//     },
//   });
// };