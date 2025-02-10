import Author from "../../models/blog/AuthorModel";
import Category from "../../models/blog/CategoryModel";
import { AppError } from "../../errors/AppError";
import Post, { PostStatus } from "../../models/blog/PostModel";
import mongoose from "mongoose";
import Profile from "../../models/user/ProfileModel";
interface FilterOptions {
  status?: PostStatus;
  published?: boolean;
  category?: string;
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
  const query: any = {
    published: true,
  };

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
  if (filterOptions.category) {
    query.category = filterOptions.category;
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

  return query;
};

// Helper function to execute the query with sorting and pagination
export const executeQuery = async (
  query: any,
  sortOptions: SortOptions,
  paginationOptions: PaginationOptions,
  select: string
) => {
  // Calculate skip value for pagination
  const skip = (paginationOptions.page - 1) * paginationOptions.limit;

  // Create sort object
  const sort: [string, 1 | -1][] = [
    [sortOptions.field, sortOptions.order === "asc" ? 1 : -1],
  ];

  let posts;

  if (query.category) {
    posts = await Category.findOne({ slug: query.category })
      .select("-_id")
      .populate([
        {
          path: "posts", // Populate the 'posts' field
          select: select,
          options: {
            limit: paginationOptions.limit,
            skip: skip,
            // sort: sort,
          },
          match: {
            published: true,
          },
          populate: [
            {
              path: "tags", // Populate the 'user' field within posts
              select: "name slug -_id",
            },
            {
              path: "authorId",
              select: "bio title userId -_id",
            },
          ],
        },
      ])
      .lean();
  } else {
    // Execute query with pagination and populate references
    posts = await Post.find(query)
      .select(select)
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
          select: "bio title userId -_id",
        },
      ])
      .lean();
  }

  if (!posts) {
    throw new AppError("No posts found", 404);
  }

  let postsWithAuthor;
  if (query.category) {
    postsWithAuthor = await Promise.all(
      posts.posts.map(async (post) => {
        // Ensure that post.authorId exists
        const newPost = { ...post } as any;
        if (post.authorId) {
          const author = await Profile.findOne({
            userId: (post.authorId as any)?.userId,
          }).select("firstName lastName email image -_id");

          if (author) {
            // Add author info to the post object
            newPost.author = {
              firstName: author.firstName,
              lastName: author.lastName,
              email: author.email,
              bio: (post.authorId as any)?.bio,
              title: (post.authorId as any)?.title,
              image: author.image,
            };
          }
        }
        newPost.categories = [
          {
            name: posts.name,
            slug: posts.slug,
          },
        ];

        delete newPost.authorId;
        return newPost;
      })
    );
  } else {
    postsWithAuthor = await Promise.all(
      posts.map(async (post) => {
        // Ensure that post.authorId exists
        const newPost = { ...post } as any;
        if (post.authorId) {
          const author = await Profile.findOne({
            userId: (post.authorId as any)?.userId,
          }).select("firstName lastName email image -_id");

          if (author) {
            // Add author info to the post object
            newPost.author = {
              firstName: author.firstName,
              lastName: author.lastName,
              email: author.email,
              bio: (post.authorId as any)?.bio,
              title: (post.authorId as any)?.title,
              image: author.image,
            };
          }
        }

        delete newPost.authorId;

        return newPost;
      })
    );
  }

  // console.log(postsWithAuthor);

  // Get total count for pagination
  const total = await Post.countDocuments(query);
  console.log(total, "total");
  console.log(postsWithAuthor);

  return {
    posts: postsWithAuthor,
    total,
  };
};
