import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import Post, { PostStatus } from "../../models/blog/PostModel";
import { buildQuery, executeQuery } from "./blog.helper";

// // Get all published posts, sorted by date
// GET /api/posts?status=PUBLISHED

// // Search posts with pagination
// GET /api/posts?search=technology&page=2&limit=20

// // Filter by category and date range
// GET /api/posts?categories=tech,news&startDate=2024-01-01&endDate=2024-12-31

// // Get posts by specific author, sorted by views
// GET /api/posts?authorId=123&sortBy=views&order=desc

interface SortOptions {
  field: string;
  order: "asc" | "desc";
}

interface PaginationOptions {
  page: number;
  limit: number;
}
interface FilterOptions {
  status?: PostStatus;
  published?: boolean;
  category?: string;
  tags?: string[];
  startDate?: Date;
  endDate?: Date;
  search?: string;
  featured?: boolean;
  metaData?: boolean;
}

export const getAdvancedPosts = async (req: Request, res: Response) => {
  // Extract query parameters with defaults
  const {
    page = 1,
    limit = 10,
    sortBy = "publishedAt",
    order = "desc",
    search,
    category,
    tags,
    status,
    startDate,
    endDate,
    featured,
    metaData = "false",
  } = req.query;

  const select =
    metaData === "true"
      ? "metaData"
      : " -_id -createdAt -updatedAt -content -expiresAt -metaData -__v";

  // Build filter options
  const filterOptions: FilterOptions = {};

  // Search functionality across multiple fields
  if (search) {
    filterOptions.search = search as string;
  }

  // Date range filter
  if (startDate || endDate) {
    const dateFilter: any = {};
    if (startDate) dateFilter.$gte = new Date(startDate as string);
    if (endDate) dateFilter.$lte = new Date(endDate as string);
    filterOptions.startDate = dateFilter.$gte;
    filterOptions.endDate = dateFilter.$lte;
  }

  // Category filter
  if (category) {
    filterOptions.category = category as string;
  }

  // Tags filter
  if (tags) {
    filterOptions.tags = (tags as string).split(",");
  }

  // Status filter
  if (status && Object.values(PostStatus).includes(status as PostStatus)) {
    filterOptions.status = status as PostStatus;
  }

  // Featured posts filter
  if (featured) {
    filterOptions.featured = featured === "true";
  }

  // Build the query
  const query = buildQuery(filterOptions);

  // Sorting options
  const sortOptions: SortOptions = {
    field: sortBy as string,
    order: order as "asc" | "desc",
  };

  // Pagination options
  const paginationOptions: PaginationOptions = {
    page: parseInt(page as string),
    limit: parseInt(limit as string),
  };

  // Execute query with pagination
  const results = await executeQuery(
    query,
    sortOptions,
    paginationOptions,
    select
  );

  // Return response
  return res.status(200).json({
    success: true,
    data: results.posts,
    pagination: {
      total: results.total,
      page: paginationOptions.page,
      limit: paginationOptions.limit,
      totalPages: Math.ceil(results.total / paginationOptions.limit),
    },
  });
};

// Fetch a single post by slug with detailed content
export const getPostcontent = async (req: Request, res: Response) => {
  const { slug } = req.params;

  // Ensure slug is provided
  if (!slug) {
    throw new AppError("Slug is required", 400);
  }

  // Fetch the post with all required fields
  const post = await Post.findOne({ slug, published: true })
    .select("title content imageUrl publishedAt tags categories user")
    .populate("user", "name image summary")
    .populate("categories", "name slug");

  // If post not found, throw error
  if (!post) {
    throw new AppError("Post not found", 404);
  }

  return res.status(200).json({
    status: "success",
    success: true,
    data: post,
  });
};
