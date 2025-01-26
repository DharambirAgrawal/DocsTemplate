import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
import User from "../../models/auth/user.model";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    userId,
    page = 1,
    limit = 10,
    sort = "createdAt", // Default to sorting by `createdAt`
    filter = "",
  } = req.query;

  const select =
    "firstName lastName accountStatus role createdAt updatedAt userId email image accountStatus isEmailVerified -_id providerProfileImage";

  // If userId is provided in the params, find and return that specific user
  if (userId) {
    const user = await User.findOne({ userId })
      .select(select)
      

    if (!user) {
      return next(new AppError("User not found", 404)); // Using custom error handler
    }
    return res.status(200).json({
      status: "success",
      data: user,
    });
  }

  // Pagination logic
  const pageNumber = parseInt(page as string);
  const pageLimit = parseInt(limit as string);
  const skip = (pageNumber - 1) * pageLimit;

  const filterConditions = filter
    ? { name: { $regex: filter, $options: "i" } }
    : {};

  // If sort is set to "none", don't apply sorting
  if (sort === "none") {
    const users = await User.find(filterConditions)
      .skip(skip)
      .limit(pageLimit)
      .select(select) // Only these fields will be returned
      

    // Count total users for pagination
    const totalUsers = await User.countDocuments(filterConditions);
    const totalPages = Math.ceil(totalUsers / pageLimit);

    return res.status(200).json({
      status: "success",
      data: users,
      pagination: {
        totalUsers,
        totalPages,
        currentPage: pageNumber,
        pageLimit,
      },
    });
  }

  // Ensure `sort` is a string and handle multiple values (e.g., array from query params)
  const sortField = Array.isArray(sort) ? sort[0] : (sort as string);

  if (typeof sortField !== "string") {
    return next(new AppError("Invalid sort parameter", 400)); // Return a 400 error if `sort` is not a string
  }

  const sortConditions: { [key: string]: 1 | -1 } = { [sortField]: 1 };

  // Fetch users with pagination, sorting, and only specific fields
  const users = await User.find(filterConditions)
    .skip(skip)
    .limit(pageLimit)
    .sort(sortConditions)
    .select(select) // Only these fields will be returned
    .select('-_id'); // Exclude _id field

  // Count total users for pagination
  const totalUsers = await User.countDocuments(filterConditions);
  const totalPages = Math.ceil(totalUsers / pageLimit);

  // Respond with paginated data
  return res.status(200).json({
    status: "success",
    data: users,
    pagination: {
      totalUsers,
      totalPages,
      currentPage: pageNumber,
      pageLimit,
    },
  });
};



export const updateUser= async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const {firstName, lastName, role, email, accountStatus, isEmailVerified} = req.body;
    
    const user = await User.findOne({userId:userId});

    if (!user) {
        throw new AppError('User not found', 404);
    }

    // Dynamically update only the fields that are provided in the request body
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (accountStatus !== undefined) user.accountStatus = accountStatus;
    if (role !== undefined) user.role = role;
    if (email !== undefined) user.email = email;
    if (accountStatus !== undefined) user.accountStatus = accountStatus;
    if (isEmailVerified !== undefined) user.isEmailVerified = isEmailVerified;

    // Save the updated user data to the database
    await user.save();

    return res.status(200).json({ status: 'success', data: user });

}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    
        // Find and delete the user by userId
        const user = await User.findOneAndDelete({userId:userId});

        if (!user) {
           throw new AppError('User not found', 404);
        }

        // Successfully deleted
        return res.status(200).json({ status:"success", message: 'User deleted successfully' });
   
};