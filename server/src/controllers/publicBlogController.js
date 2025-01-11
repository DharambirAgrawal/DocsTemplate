import asyncHandler from "express-async-handler";
import { AppError } from "../errors/AppError.js";
import { prisma } from "../../app.js";

export const getPosts = asyncHandler(async (req, res) => {
  // Extracting pagination, filters, and random flag from query parameters
  const {
    recent = false,
    category,
    random = false,
    take = 10,
    skip = 0,
  } = req.query;

  // Define the base where clause
  const whereClause = {
    published: true, // Only fetch published posts
  };

  // If category is provided, filter by category
  if (category) {
    whereClause.categories = {
      some: {
        slug: category, // Filter posts by category slug
      },
    };
  }

  // Start building the Prisma query
  let postsQuery = {
    where: whereClause,
    select: {
      title: true,
      slug: true,
      imageUrl: true,
      publishedAt: true,
      summary: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      categories: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    take: parseInt(take), // Apply pagination, take a certain number of posts
    skip: parseInt(skip), // Skip a certain number of posts for pagination
  };

  // If recent is "true", order posts by publishedAt in descending order
  if (recent === "true") {
    postsQuery.orderBy = {
      publishedAt: "desc", // Order by most recent posts first
    };
  }

  // If "random" is provided, order the posts randomly
  if (random === "true") {
    // For random selection, set take to a higher number (for randomness) but limit after fetching
    postsQuery.take = 100;
  }

  // Fetch the posts based on the query
  const posts = await prisma.post.findMany(postsQuery);

  if (!posts || posts.length === 0) {
    throw new AppError("No posts found for the specified filters", 404);
  }

  // If category is provided, filter the categories to only return the requested one
  if (category) {
    posts.forEach((post) => {
      // Filter out categories to keep only the requested category
      post.categories = post.categories.filter((cat) => cat.slug === category);
    });
  }

  // If random is true, shuffle the posts array and limit to "take" posts
  if (random === "true") {
    // Shuffle the posts array if "random" is true
    posts.sort(() => Math.random() - 0.5);

    // Limit the number of posts to the requested "take" value
    posts.splice(parseInt(take)); // Remove extra posts if more than "take" are available
  }

  return res.status(200).json({
    status: "success",
    data: posts,
  });
});

export const getPostcontent = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    throw new AppError("Resource not found", 400);
  }
  const post = await prisma.post.findUnique({
    where: { slug: slug, published: true },
    select: {
      title: true,
      content: true,
      imageUrl: true,
      publishedAt: true,
      tags: {
        select: {
          name: true,
          slug: true,
        },
      },
      categories: {
        select: {
          name: true,
          slug: true,
        },
      },
      user: {
        select: {
          name: true,
          image: true,
          summary: true,
        },
      },
    },
  });
  if (!post) {
    throw new AppError("Resource not found", 404);
  }
  res.status(200).json({
    status: "success",
    data: post,
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const { limit, page = 1 } = req.query;

  // Convert `page` to number
  const pageNumber = Number(page);
  let pageSize = Number(limit);

  // Default to returning all categories if `limit` is not provided or is set to 0
  if (!limit || pageSize <= 0) {
    pageSize = 1000; // Arbitrary large number to return all categories. Adjust as needed.
  }

  // Calculate the skip for pagination
  const skip = (pageNumber - 1) * pageSize;

  // Fetch categories with pagination and filtering only published posts in the count
  const categories = await prisma.category.findMany({
    where: {
      posts: {
        some: {
          published: true, // Only count categories that have published posts
        },
      },
    },
    select: {
      name: true,
      slug: true,
      _count: {
        select: {
          posts: {
            where: {
              published: true, // Count only published posts
            },
          },
        },
      },
    },
    take: pageSize, // Limit the number of categories returned
    skip: skip, // Skip records for pagination
  });

  // Filter categories with more than 0 published posts
  const filteredCategories = categories
    .filter((category) => category._count.posts > 0) // Only categories with > 0 published posts
    .map((category) => ({
      ...category,
      count: category._count.posts, // Rename _count.posts to count
      _count: undefined, // Optionally remove the _count field
    }));

  return res.status(200).json({
    status: "success",
    data: filteredCategories,
  });
});
