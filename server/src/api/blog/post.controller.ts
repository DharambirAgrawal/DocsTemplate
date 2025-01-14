import { Request, Response } from 'express';
import { AppError } from '../../errors/AppError';
import Post from "../../models/blog/PostModel";
import Category from '../../models/blog/CategoryModel';
import Tag from '../../models/blog/TagModel';
import { generateUniqueSlug } from './blog.helper';

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
    publishedAt,
    expiresAt,
    categories,
    tags,
    slug,
    publish,
  } = req.body;

  const { update } = req.query;  // Get the query parameter for update
  const authorId = req.author.id;
  
  // Check if required fields are missing
  const requiredFields = ['title', 'timeRead', 'content', 'summary', 'metaTitle', 'metaDesc', 'metaKeywords', 'categories', 'tags'];
  const missingFields = requiredFields.filter(field => !req.body[field]);
  if (missingFields.length > 0) {
    throw new AppError(`Missing required fields: ${missingFields.join(', ')}`, 400);
  }

  let post = null;
  
  // If 'update' is true, fetch the existing post
  if (update === 'true' && slug) {
    post = await Post.findOne({ slug }).populate('categories tags');
    if (!post) {
      throw new AppError('Post not found for the given slug.', 404);
    }
  }

  // Create or connect categories
  const categoriesToConnectOrCreate = categories.map(async (category: string) => {
    let categoryDoc = await Category.findOne({ slug: category.toLowerCase().replace(/\s+/g, '-') });
    if (!categoryDoc) {
      categoryDoc = await Category.create({ name: category, slug: category.toLowerCase().replace(/\s+/g, '-') });
    }
    return categoryDoc._id;
  });

  // Create or connect tags
  const tagsToConnectOrCreate = tags.map(async (tag: string) => {
    let tagDoc = await Tag.findOne({ slug: tag.toLowerCase().replace(/\s+/g, '-') });
    if (!tagDoc) {
      tagDoc = await Tag.create({ name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') });
    }
    return tagDoc._id;
  });

  // Wait for all categories and tags to be populated
  const [categoryIds, tagIds] = await Promise.all([Promise.all(categoriesToConnectOrCreate), Promise.all(tagsToConnectOrCreate)]);

  // Prepare data for saving the post
  const postData = {
    title,
    slug: update === 'true' && post ? post.slug : await generateUniqueSlug(title),
    timeRead,
    content,
    summary,
    imageUrl,
    metaData:{

        metaTitle,
        metaDesc,
        metaKeywords,
        metaImage,
    },
    authorId:authorId,
    categories: categoryIds,
    tags: tagIds,
    status: publish ? 'PUBLISHED' : 'DRAFT',
    published: publish || false,
    publishedAt: publish ? publishedAt || new Date() : undefined,
    expiresAt,
  };

  let newPost;
  if (update === 'true' && post) {
    // If updating, use the existing post
    newPost = await Post.findOneAndUpdate({ slug: slug }, postData, { new: true, runValidators: true }).populate('categories tags');
  } else {
    // If creating a new post
    newPost = await Post.create(postData);
  }

  res.status(200).json({
    status: 'success',
    data: {
      slug: newPost.slug,
    },
  });
};
