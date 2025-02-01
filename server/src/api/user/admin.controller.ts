import { Request, Response, NextFunction } from "express";
import Newsletter from "../../models/user/NewsLetterModel";
import { AppError } from "../../errors/AppError";

export const getNewsletters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page = 1, limit = 10, sort = "createdAt", filter = "" } = req.query;
  const select = "_id email status createdAt updatedAt";

  // Pagination logic
  const pageNumber = parseInt(page as string);
  const pageLimit = parseInt(limit as string);
  const skip = (pageNumber - 1) * pageLimit;

  const filterConditions = filter
    ? { name: { $regex: filter, $options: "i" } }
    : {};

  // Ensure `sort` is a string and handle multiple values (e.g., array from query params)
  const sortField = Array.isArray(sort) ? sort[0] : (sort as string);

  if (typeof sortField !== "string") {
    return next(new AppError("Invalid sort parameter", 400)); // Return a 400 error if `sort` is not a string
  }

  const sortConditions: { [key: string]: 1 | -1 } = { [sortField]: 1 };

  // Fetch users with pagination, sorting, and only specific fields
  const newsletters = await Newsletter.find(filterConditions)
    .skip(skip)
    .limit(pageLimit)
    .sort(sortConditions)
    .select(select) // Only these fields will be returned
    .lean();

  const modifiedNewsletters = newsletters.map((newsletter) => ({
    ...newsletter,
    id: newsletter._id,
    // Optionally, remove _id if you don't want it to be included
    _id: undefined,
  }));

  // Count total users for pagination
  const totalUsers = await Newsletter.countDocuments(filterConditions);
  const totalPages = Math.ceil(totalUsers / pageLimit);

  // Respond with paginated data
  return res.status(200).json({
    status: "success",
    success: true,
    data: modifiedNewsletters,
    pagination: {
      totalUsers,
      totalPages,
      currentPage: pageNumber,
      pageLimit,
    },
  });
};

export const updateNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const { email, status, createdAt, updatedAt } = req.body;

  const newsletter = await Newsletter.findById(id);

  if (!newsletter) {
    throw new AppError("Newsletters not found", 404);
  }

  // Dynamically update only the fields that are provided in the request body
  if (updatedAt !== undefined) newsletter.updatedAt = updatedAt;
  if (email !== undefined) newsletter.email = email;
  if (createdAt !== undefined) newsletter.createdAt = createdAt;
  if (status !== undefined) newsletter.status = status;

  // Save the updated user data to the database
  await newsletter.save();

  return res.status(200).json({ status: "success", data: newsletter });
};

export const deleteNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  // Find and delete the user by userId
  const newsletter = await Newsletter.findByIdAndDelete(id);

  if (!newsletter) {
    throw new AppError("User not found", 404);
  }

  // Successfully deleted
  return res
    .status(200)
    .json({ status: "success", message: "Newsletter deleted successfully" });
};
