import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import Post from "../../models/blog/PostModel";
import Category from "../../models/blog/CategoryModel";
import Tag from "../../models/blog/TagModel";
import { generateUniqueSlug } from "./blog.helper";

export const saveOrPublishPost = async (req: Request, res: Response) => {
  const {
    title,
    timeRead,
    content,
    summary,
    imageUrl,
    metaTitle,
    metaDesc,
    metaKeywords,
    metaImage,
    categories,
    tags,
  } = req.body;

  const { publish } = req.query; // Get the query parameter for publish
  const authorId = (req as any).author;
  console.log(authorId)
  console.log('..........')

  // Validate required fields based on publish status
  let requiredFields = ["title"]; // Only title is required if not publishing
  if (publish === "true") {
    // Add all other fields as required when publishing
    requiredFields = [
      "title",
      "timeRead",
      "content",
      "summary",
      "metaTitle",
      "metaDesc",
      "metaKeywords",
      "categories",
      "tags",
    ];
  }

  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    throw new AppError(
      `Missing required fields: ${missingFields.join(", ")}`,
      400
    );
  }

  // Create or connect categories
  const categoriesToConnectOrCreate = categories.map(
    async (category: string) => {
      let categoryDoc = await Category.findOne({
        slug: generateUniqueSlug(category),
      });
      if (!categoryDoc) {
        categoryDoc = await Category.create({
          name: category,
          slug: generateUniqueSlug(category),
        });
      }
      return categoryDoc._id;
    }
  );

  // Create or connect tags
  const tagsToConnectOrCreate = tags.map(async (tag: string) => {
    let tagDoc = await Tag.findOne({ slug: generateUniqueSlug(tag) });
    if (!tagDoc) {
      tagDoc = await Tag.create({ name: tag, slug: generateUniqueSlug(tag) });
    }
    return tagDoc._id;
  });

  // Wait for all categories and tags to be populated
  const [categoryIds, tagIds] = await Promise.all([
    Promise.all(categoriesToConnectOrCreate),
    Promise.all(tagsToConnectOrCreate),
  ]);

  // Prepare data for saving the post
  const postData = {
    title,
    timeRead,
    content,
    summary,
    imageUrl,
    metaData: {
      metaTitle,
      metaDesc,
      metaKeywords,
      metaImage,
    },
    authorId: authorId,
    categories: categoryIds,
    tags: tagIds,
    status: publish === "true" ? "PUBLISHED" : "DRAFT",
    published: publish || false,
  };
  const newPost = new Post(postData);
  // Create a new post
  await newPost.saveSlug();
  await newPost.save();

  res.status(200).json({
    status: "success",
    data: {
      slug: newPost.slug,
    },
  });
};
