import Author from "../../models/blog/AuthorModel";
import { AppError } from "../../errors/AppError";
import Post, { PostStatus } from "../../models/blog/PostModel";
import mongoose from "mongoose";
interface FilterOptions {
  status?: PostStatus;
  published?: boolean;
  categories?: string[];
  tags?: string[];
  authorId?: string;
  startDate?: Date;
  endDate?: Date;
  search?: string;
  featured?: boolean;
}
interface SortOptions {
  field: string;
  order: "asc" | "desc";
}

interface PaginationOptions {
  page: number;
  limit: number;
}
export function generateUniqueSlug(title: string) {
  // Generate the basic slug from the title
  const baseSlug = title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, ""); // Remove non-word characters except hyphens

  return baseSlug;
}

export const createAuthor = async (userId: string) => {
  const author = new Author({
    userId: userId,
  });

  await author.save();
  if (!author) {
    throw new AppError("Error while creating author", 400);
  }

  return {
    status: "success",
    message: "Author created successfully",
  };
};

// Helper function to build the query
export const buildQuery = (filterOptions: FilterOptions) => {
  const query: any = {};

  // Add search conditions
  if (filterOptions.search) {
    query.$or = [
      { title: { $regex: filterOptions.search, $options: "i" } },
      { content: { $regex: filterOptions.search, $options: "i" } },
      { summary: { $regex: filterOptions.search, $options: "i" } },
      {
        "metaData.metaKeywords": {
          $regex: filterOptions.search,
          $options: "i",
        },
      },
    ];
  }

  // Add date range conditions
  if (filterOptions.startDate || filterOptions.endDate) {
    query.publishedAt = {};
    if (filterOptions.startDate)
      query.publishedAt.$gte = filterOptions.startDate;
    if (filterOptions.endDate) query.publishedAt.$lte = filterOptions.endDate;
  }

  // Add category conditions
  if (filterOptions.categories && filterOptions.categories.length > 0) {
    query.categories = {
      $in: filterOptions.categories.map((cat) =>
        mongoose.Types.ObjectId.isValid(cat)
          ? new mongoose.Types.ObjectId(cat)
          : cat
      ),
    };
  }

  // Add tag conditions
  if (filterOptions.tags && filterOptions.tags.length > 0) {
    query.tags = {
      $in: filterOptions.tags.map((tag) =>
        mongoose.Types.ObjectId.isValid(tag)
          ? new mongoose.Types.ObjectId(tag)
          : tag
      ),
    };
  }

  // Add status condition
  if (filterOptions.status) {
    query.status = filterOptions.status;
  }

  // Add author condition
  if (filterOptions.authorId) {
    query.authorId = new mongoose.Types.ObjectId(filterOptions.authorId);
  }

  return query;
};

// Helper function to execute the query with sorting and pagination
export const executeQuery = async (
  query: any,
  sortOptions: SortOptions,
  paginationOptions: PaginationOptions
) => {
  // Calculate skip value for pagination
  const skip = (paginationOptions.page - 1) * paginationOptions.limit;

  // Create sort object
  const sort: [string, 1 | -1][] = [
    [sortOptions.field, sortOptions.order === "asc" ? 1 : -1],
  ];

  // Execute query with pagination and populate references
  const posts = await Post.find(query)
    .select("-_id -__v")
    .sort(sort)
    .skip(skip)
    .limit(paginationOptions.limit)
    .populate([
      {
        path: "categories",
        select: "name slug -_id",
      },
      {
        path: "tags",
        select: "name slug -_id",
      },
      {
        path: "authorId",
        select: "name image -_id",
      },
    ]);

  // Get total count for pagination
  const total = await Post.countDocuments(query);

  return {
    posts,
    total,
  };
};
