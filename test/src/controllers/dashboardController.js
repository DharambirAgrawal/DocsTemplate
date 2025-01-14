import asyncHandler from "express-async-handler";
import { AppError } from "../errors/AppError.js";
import { prisma } from "../../app.js";
import { generateUniqueSlug } from "../utils/utils.js";
import {
  cloudinaryUpload,
  updateCloudinaryImageMetaData,
  deleteCloudinaryImage,
} from "../services/cloudinaryService.js";
import { separateBaseUrl } from "../services/cloudinaryService.js";

export const savePost = asyncHandler(async (req, res) => {
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
    update,
  } = req.body;
  const id = req.user.id;
  if (!title) {
    throw new AppError("Resource not found", 400);
  }
  let post;
  if (update) {
    post = await prisma.post.findUnique({
      where: { slug: update.slug },
      include: {
        categories: true,
        tags: true,
      },
    });
  }
  let newPost;
  if (!update || !update.slug || !post) {
    // TODO: save user as well
    newPost = await prisma.post.create({
      data: {
        title: title,
        slug: await generateUniqueSlug(title),
        timeRead: timeRead || null,
        content: content || null,
        summary: summary || null,
        imageUrl: imageUrl || null,
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
        metaKeywords: metaKeywords || null,
        metaImage: metaImage || null,
        expiresAt: expiresAt || null,
        userId: id,
        // For categories: Check if category exists, create if not
        categories:
          categories && categories.length > 0
            ? {
                connectOrCreate: categories.map((category) => ({
                  where: { name: category }, // Ensure category exists based on name
                  create: {
                    name: category,
                    slug: category.toLowerCase().replace(/\s+/g, "-"), // Creating a slug
                  },
                })),
              }
            : undefined, // If categories are undefined or empty, don't include this field

        // For tags: Assuming tags are also passed as an array of strings
        tags:
          tags && tags.length > 0
            ? {
                connectOrCreate: tags.map((tag) => ({
                  where: { name: tag }, // Ensure tag exists based on name
                  create: {
                    name: tag,
                    slug: tag.toLowerCase().replace(/\s+/g, "-"), // Creating a slug
                  },
                })),
              }
            : undefined,
      },
    });
  } else {
    newPost = await prisma.post.update({
      where: { slug: update.slug }, // Find the post by its slug (assuming the post exists)
      include: {
        categories: true, // Include related categories
        tags: true, // Include related tags
      },
      data: {
        title: title,
        slug: await generateUniqueSlug(title),
        timeRead: timeRead || null,
        content: content || null,
        summary: summary || null,
        imageUrl: imageUrl || null,
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
        metaKeywords: metaKeywords || null,
        metaImage: metaImage || null,
        expiresAt: expiresAt || null,
        categories: {
          // Connect or create new categories
          connectOrCreate: categories.map((category) => ({
            where: { name: category },
            create: {
              name: category,
              slug: category.toLowerCase().replace(/\s+/g, "-"),
            },
          })),
          // Disconnect categories that are not in the new list
          disconnect: post.categories
            ? post.categories
                .filter((category) => !categories.includes(category.name)) // Disconnect removed categories
                .map((category) => ({ id: category.id })) // Get the ids to disconnect
            : [], // If no categories exist, return an empty array
        },
        tags: {
          // Connect or create new tags
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: {
              name: tag,
              slug: tag.toLowerCase().replace(/\s+/g, "-"),
            },
          })),
          // Disconnect tags that are not in the new list
          disconnect: post.tags
            ? post.tags
                .filter((tag) => !tags.includes(tag.name)) // Disconnect removed tags
                .map((tag) => ({ id: tag.id })) // Get the ids to disconnect
            : [], // If no tags exist, return an empty array
        },
        status: "DRAFT", // Update the status to published when publishing the post
        published: false, // Mark the post as published
      },
    });
  }

  res.status(200).json({
    ststus: "success",
    data: {
      slug: newPost.slug,
    },
  });
});

export const publishPost = asyncHandler(async (req, res) => {
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
    update,
  } = req.body;
  const id = req.user.id;
  // List of required fields
  const requiredFields = [
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

  // Check if any required field is missing or undefined
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    throw new AppError(
      `Missing required fields: ${missingFields.join(", ")}`,
      400
    );
  }

  let post;
  if (update) {
    post = await prisma.post.findUnique({
      where: { slug: update.slug },
      include: {
        categories: true,
        tags: true,
      },
    });
  }
  let newPost;
  if (!update || !update.slug || !post) {
    // Create new post (for fresh publishing)
    newPost = await prisma.post.create({
      data: {
        title,
        slug: await generateUniqueSlug(title),
        timeRead,
        content,
        summary,
        imageUrl: imageUrl || undefined,
        metaTitle,
        metaDesc,
        metaKeywords,
        metaImage: metaImage || undefined,
        userId: id,
        publishedAt: publishedAt || new Date(), // Add the publish date (use current date if not provided)
        expiresAt: expiresAt || null,
        categories: {
          connectOrCreate: categories.map((category) => ({
            where: {
              slug: category.toLowerCase().replace(/\s+/g, "-"),
            },
            create: {
              name: category,
              slug: category.toLowerCase().replace(/\s+/g, "-"),
            },
          })),
        },
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { slug: tag.toLowerCase().replace(/\s+/g, "-") },
            create: {
              name: tag,
              slug: tag.toLowerCase().replace(/\s+/g, "-"),
            },
          })),
        },
        status: "PUBLISHED", // Set the status to published
        published: true,
      },
    });
  } else {
    // Update existing post
    // TODO: if the category or tag is not connected to any post delete it
    newPost = await prisma.post.update({
      where: { slug: update.slug }, // Find the post by its slug (assuming the post exists)
      include: {
        categories: true, // Include related categories
        tags: true, // Include related tags
      },
      data: {
        title,
        slug: await generateUniqueSlug(title),
        timeRead,
        content,
        summary,
        imageUrl: imageUrl || undefined,
        metaTitle,
        metaDesc,
        metaKeywords,
        metaImage: metaImage || undefined,

        publishedAt: publishedAt || new Date(),
        expiresAt: expiresAt || null,
        categories: {
          // Connect or create new categories
          connectOrCreate: categories.map((category) => ({
            where: { slug: category.toLowerCase().replace(/\s+/g, "-") },
            create: {
              name: category,
              slug: category.toLowerCase().replace(/\s+/g, "-"),
            },
          })),
          // Disconnect categories that are not in the new list
          disconnect: post.categories
            ? post.categories
                .filter((category) => !categories.includes(category.name)) // Disconnect removed categories
                .map((category) => ({ id: category.id })) // Get the ids to disconnect
            : [], // If no categories exist, return an empty array
        },
        tags: {
          // Connect or create new tags
          connectOrCreate: tags.map((tag) => ({
            where: { slug: tag.toLowerCase().replace(/\s+/g, "-") },
            create: {
              name: tag,
              slug: tag.toLowerCase().replace(/\s+/g, "-"),
            },
          })),
          // Disconnect tags that are not in the new list
          disconnect: post.tags
            ? post.tags
                .filter((tag) => !tags.includes(tag.name)) // Disconnect removed tags
                .map((tag) => ({ id: tag.id })) // Get the ids to disconnect
            : [], // If no tags exist, return an empty array
        },
        status: "PUBLISHED", // Update the status to published when publishing the post
        published: true, // Mark the post as published
      },
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      slug: newPost.slug,
    },
  });
});

export const saveImageData = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new AppError("No image found", 400);
  }
  //saving image data to the database and cloudinary
  req.files.forEach(async (file) => {
    const { buffer, originalname } = file;
    const folder = "pathgurus/blog";
    const { secure_url, public_id, format, created_at } =
      await cloudinaryUpload(buffer, folder);
    const mainUrl = separateBaseUrl(secure_url);

    await prisma.image.create({
      data: {
        url: mainUrl,
        publicId: public_id,
        format: format,
        createdAt: created_at,
        title: originalname,
      },
    });
  });
  res.status(200).json({ message: "Saved image data successfully" });
});

export const UpdateImageData = asyncHandler(async (req, res) => {
  const { url, title, description, tags, publicId, altText } = req.body;
  if (!url || !publicId) {
    throw new AppError("Resource not found", 400);
  }
  const image = await prisma.image.findUnique({
    where: { publicId: publicId },
  });
  if (!image) {
    throw new AppError("Image not found", 404);
  }

  await updateCloudinaryImageMetaData(publicId, {
    title: title || image.title,
    description: description || image.description,
    tags: tags || image.tags,
    altText: altText || image.altText,
  });

  const updatedImage = await prisma.image.update({
    where: { publicId: publicId },
    data: {
      title: title || image.title,
      description: description || image.description,
      tags: tags || image.tags,
      altText: altText || image.altText,
    },
  });

  if (!updatedImage) {
    throw new AppError("Image not updated", 500);
  }

  res.status(200).json({
    status: "success",
    data: {
      url: updatedImage.url,
      title: updatedImage.title,
      description: updatedImage.description,
      tags: updatedImage.tags,
      altText: updatedImage.altText,
      publicId: updatedImage.publicId,
    },
  });
});

export const deleteImage = asyncHandler(async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) {
    throw new AppError("Resource not found", 400);
  }
  const image = await prisma.image.findUnique({
    where: { publicId: publicId },
  });
  if (!image) {
    throw new AppError("Resource not found", 404);
  }
  await prisma.image.delete({
    where: { publicId: publicId },
  });

  await deleteCloudinaryImage(publicId);
  res.status(200).json({ message: "Image deleted successfully" });
});

export const getImages = asyncHandler(async (req, res) => {
  const { id, page, recent = false } = req.query;

  if (!page) {
    throw new AppError("Resource not found", 400);
  }
  if (id) {
    const image = await prisma.image.findUnique({
      where: { publicId: id },
    });
    if (!image) {
      throw new AppError("Resource not found", 404);
    }
    const { url, title, format, description, altText, tags, createdAt } = image;
    const fullUrl = `${process.env.CLOUDINARY_BASE_URL}${url}`;
    return res.status(200).json({
      status: "success",
      image: {
        url: fullUrl,
        title,
        format,
        description,
        altText,
        publicId: id,
        tags,
        createdAt,
      },
    });
  }
  const images = await prisma.image.findMany({
    select: {
      title: true,
      url: true,
      description: true,
      altText: true,
      publicId: true,
      tags: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: recent === "true" ? "desc" : "asc", // Order by most recent if 'recent' filter is true
    },
  });
  const filterImages = images.map((image) => {
    const { url, title, description, altText, publicId, tags, createdAt } =
      image;

    const fullUrl = `${process.env.CLOUDINARY_BASE_URL}${url}`;
    return {
      url: fullUrl,
      title,
      description,
      altText,
      publicId,
      tags,
      createdAt,
    };
  });
  // TODO: add pagination and filtering
  res.status(200).json({
    status: "success",
    images: filterImages,
  });
});

export const getPosts = asyncHandler(async (req, res) => {
  // TODO: add pagination and filtering
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      categories: true,
      tags: true,
    },
  });

  res.status(200).json(posts);
});
export const getPostcontent = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    throw new AppError("Resource not found", 400);
  }
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      categories: true,
      tags: true,
      user: true,
    },
  });
  if (!post) {
    throw new AppError("Resource not found", 404);
  }
  res.status(200).json({
    status: "success",
    data: {
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      publishedAt: post.publishedAt || post.createdAt,
      tags: post.tags.map((tag) => tag.name),
      categories: post.categories.map((category) => category.name),
      timeRead: post.timeRead,
      user:
        post.user == null
          ? null
          : {
              name: post.user.name,
              image: post.user.image,
              summary: post.user.summary,
            },
    },
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const { num } = req.query;

  if (Number(num) > 0) {
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
                published: true, // Add a filter to count only published posts
              },
            },
          },
        },
      },
      take: Number(num),
    });
    const filterCategories = categories
      .filter((category) => category._count.posts > 0) // Filter categories with > 0 posts
      .map((category) => ({
        ...category,
        count: category._count.posts, // Renaming _count.posts to likeCount
        _count: undefined, // Optionally, remove the original _count field
      }));
    return res.status(200).json({
      status: "success",
      data: filterCategories,
    });
  } else {
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
                published: true, // Add a filter to count only published posts
              },
            },
          },
        },
      },
    });

    const filterCategories = categories
      .filter((category) => category._count.posts > 0) // Filter categories with > 0 posts
      .map((category) => ({
        ...category,
        count: category._count.posts, // Renaming _count.posts to likeCount
        _count: undefined, // Optionally, remove the original _count field
      }));

    return res.status(200).json({
      status: "success",
      data: filterCategories,
    });
  }
});

export const getTags = asyncHandler(async (req, res) => {
  const tags = await prisma.tag.findMany({
    where: {
      posts: {
        some: {
          published: true,
        },
      },
    },
    select: {
      name: true,
      slug: true,
      _count: {
        select: {
          posts: true, // This will count the number of posts related to each category
        },
      },
    },
  });

  const filterTags = tags
    .filter((tag) => tag._count.posts > 0) // Filter categories with > 0 posts
    .map((tag) => ({
      ...tag,
      count: tag._count.posts, // Renaming _count.posts to likeCount
      _count: undefined, // Optionally, remove the original _count field
    }));

  res.status(200).json({
    status: "success",
    data: filterTags,
  });
});

// TODO: Needed to be completed
export const deleteCategories = asyncHandler(async (req, res) => {
  // Delete categories with no posts
  await prisma.category.deleteMany({
    where: {
      posts: {
        none: {}, // This condition checks for categories with no related posts
      },
    },
  });
});

export const getRecentPosts = asyncHandler(async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: {
      title: true,
      slug: true,
      imageUrl: true,
      publishedAt: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });
  if (!posts) {
    throw new AppError("Resource not found", 404);
  }
  res.status(200).json({
    status: "success",
    data: posts,
  });
});
