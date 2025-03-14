import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import Category from "../../models/blog/CategoryModel"; // Assuming Category is your Mongoose model

// export const getCategories = async (req: Request, res: Response) => {
//   const { limit, page = 1 } = req.query;

//   // Convert `page` to number
//   const pageNumber = Number(page);
//   let pageSize = Number(limit);

//   // Default to returning all categories if `limit` is not provided or is set to 0
//   if (!limit || pageSize <= 0 || limit === "0") {
//     pageSize = 10000; // Arbitrary large number to return all categories
//   }

//   // Calculate the skip for pagination
//   const skip = (pageNumber - 1) * pageSize;

//   // Aggregate query to get categories with the count of published posts
//   const categories = await Category.aggregate([
//     {
//       $lookup: {
//         from: "posts", // Assuming posts collection name is "posts"
//         localField: "_id", // Join by category ID
//         foreignField: "categories", // Assuming posts reference categories by category IDs
//         as: "posts",
//       },
//     },
//     {
//       $addFields: {
//         count: {
//           $size: {
//             $filter: {
//               input: "$posts",
//               as: "post",
//               cond: { $eq: ["$$post.published", true] }, // Filter for published posts only
//             },
//           },
//         },
//       },
//     },
//     {
//       $match: {
//         count: { $gt: 0 }, // Only categories with at least one published post
//       },
//     },
//     {
//       $project: {
//         name: 1,
//         slug: 1,
//         count: 1, // Rename _count.posts to count
//       },
//     },
//     {
//       $skip: skip, // Skip records for pagination
//     },
//     {
//       $limit: pageSize, // Limit the number of categories returned
//     },
//   ]);

//   if (!categories || categories.length === 0) {
//     throw new AppError("No categories found", 404);
//   }
//   console.log(categories);

//   return res.status(200).json({
//     status: "success",
//     success: true,
//     data: categories,
//   });
// };
export const getCategories = async (req: Request, res: Response) => {
  const { limit, page = 1 } = req.query;

  // Convert `page` to number
  const pageNumber = Number(page);
  let pageSize = Number(limit);

  // Default to returning all categories if `limit` is not provided or is set to 0
  if (!limit || pageSize <= 0 || limit === "0") {
    pageSize = 10000; // Arbitrary large number to return all categories
  }

  // Calculate the skip for pagination
  const skip = (pageNumber - 1) * pageSize;

  // Aggregate query to get categories with the count of published posts
  const categories = await Category.aggregate([
    {
      $lookup: {
        from: "posts", // Assuming posts collection name is "posts"
        localField: "_id", // Join by category ID
        foreignField: "categories", // Assuming posts reference categories by category IDs
        as: "posts",
      },
    },
    {
      $addFields: {
        postCount: {
          // Change the field name to postCount
          $size: {
            $filter: {
              input: "$posts",
              as: "post",
              cond: { $eq: ["$$post.published", true] }, // Filter for published posts only
            },
          },
        },
      },
    },
    {
      $match: {
        postCount: { $gt: 0 }, // Only categories with at least one published post
      },
    },
    {
      $project: {
        name: 1,
        slug: 1,
        postCount: 1, // Rename _count.posts to postCount
      },
    },
    {
      $skip: skip, // Skip records for pagination
    },
    {
      $limit: pageSize, // Limit the number of categories returned
    },
  ]);

  if (!categories || categories.length === 0) {
    throw new AppError("No categories found", 404);
  }

  return res.status(200).json({
    status: "success",
    success: true,
    data: categories,
  });
};

// export const getCategories = async (req: Request, res: Response) => {
//   // Extract query parameters
//   const { recent = false, category, limit = 10 } = req.query;

//   // Aggregate categories with the count of posts
//   const categories = await Category.aggregate([
//     {
//       $project: {
//         name: 1, // Include the category name
//         slug: 1, // Include the slug
//         _id: 0,
//         postCount: { $size: "$posts" }, // Count the posts array
//       },
//     },
//     // { $limit: Number(limit) }, // Limit the number of categories returned
//   ]);

//   // If no categories are found, return an error
//   if (!categories || categories.length === 0) {
//     throw new AppError("No categories found", 404);
//   }

//   // Return the result here
//   return res.status(200).json({
//     success: true,
//     data: categories,
//   });
// };
