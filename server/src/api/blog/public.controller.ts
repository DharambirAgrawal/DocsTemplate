import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import Post from "../../models/blog/PostModel";
import Category from "../../models/blog/CategoryModel";

// Fetch multiple posts with pagination, sorting, and filtering
export const getPublicPosts = async (req: Request, res: Response) => {
  const { recent = false, category, random = false, take = 10, skip = 0 } = req.query;

  // Define the base filter criteria (only published posts)
  const whereClause: any = {
    published: true, // Only fetch published posts
  };

  // If a category is specified, filter by category
  if (category) {
    const categoryPosts = await Category.findOne({ slug: category }).populate([
      {
        path: "posts", // Populate the 'posts' field
        select: "slug -_id title imageUrl publishedAt summary metaData", // Select only the required fields for posts
        match: whereClause,
        populate: [
          {
            path: "categories", // Populate the 'user' field within posts
            select: "name slug -_id", // Select only the 'name' and 'image' fields from the 'user' model
          },
          {
            path: "tags", // Populate the 'user' field within posts
            select: "name slug -_id",
          },
          {
            path: 'authorId',
            select: 'name image -_id'
          }
        ],
      },
    ]);
    if (!categoryPosts || categoryPosts.posts.length === 0) {
      throw new AppError("Category not found", 404);
    }
    return res.status(200).json({
      success: true,
      data: categoryPosts.posts,
    });
  }

  // Build the Mongoose query
  let postsQuery: any = {
    where: whereClause,
    select: {
      title: true,
      slug: true,
      imageUrl: true,
      publishedAt: true,
      summary: true,
    },
    skip: parseInt(skip as string), // Skip for pagination
    limit: parseInt(take as string), // Limit the number of posts per page
  };

  // Sort by recent if needed
  if (recent === "true") {
    postsQuery.sort = { publishedAt: -1 }; // Sort by most recent
  }

  // If "random" is provided, fetch more posts and shuffle later
  if (random === "true") {
    postsQuery.limit = 100; // Fetch more posts than required for randomness
  }

  // Fetch posts from the database
  const posts = await Post.find(whereClause)
    .select("title slug imageUrl publishedAt summary user categories")
    .skip(postsQuery.skip)
    .limit(postsQuery.limit)
    .sort(postsQuery.sort);

  if (!posts || posts.length === 0) {
    throw new AppError("No posts found for the specified filters", 404);
  }

  // If category is provided, filter categories to match the requested one
  if (category) {
    posts.forEach((post) => {
      post.categories = post.categories.filter((cat: any) => cat.slug === category);
    });
  }

  // If random is true, shuffle the posts and limit them
  if (random === "true") {
    posts.sort(() => Math.random() - 0.5); // Shuffle array
    posts.splice(parseInt(take as string)); // Limit to 'take' number of posts
  }

  return res.status(200).json({
    status: "success",
    success: true,
    data: posts,
  });
}
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
}
