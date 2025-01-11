import asyncHandler from "express-async-handler";
import { AppError } from "../errors/AppError.js";
import { prisma } from "../../app.js";

export const getMetaKeywords = asyncHandler(async (req, res) => {
  const metaKeywords = await prisma.post.findMany({
    select: {
      metaKeywords: true,
    },
  });

  if (!metaKeywords) {
    throw new AppError("Resource not found", 404);
  }

  // Step 1: Extract all metaKeywords from the result
  const allKeywords = metaKeywords
    .map((post) => post.metaKeywords) // Extract metaKeywords
    .filter((keyword) => keyword !== null); // Filter out null values

  // Step 2: Flatten any nested arrays (if applicable)
  const keywordArray = allKeywords.join(",").split(","); // Join and split by commas

  // Step 3: Remove duplicates by converting to a Set
  const uniqueKeywords = [...new Set(keywordArray)];

  // Step 4: Send the unique keywords in the response
  res.status(200).json({
    status: "success",
    data: uniqueKeywords,
  });
});

export const getPostSlugs = asyncHandler(async (req, res) => {
  const post = await prisma.post.findMany({
    where: { published: true },
    select: {
      slug: true,
    },
  });
  if (!post || post.length === 0) {
    throw new AppError("Resource not found", 404);
  }

  const slugs = post.map((slug) => slug.slug);
  res.status(200).json({
    status: "success",
    data: slugs,
  });
});

export const getPostCategories = asyncHandler(async (req, res) => {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
      slug: true,
      updatedAt: true,
    },
  });

  if (!categories) {
    throw new AppError("Resource not found", 404);
  }

  res.status(200).json({
    status: "success",
    data: categories,
  });
});

export const getPostMetaData = asyncHandler(async (req, res) => {
  const meta = await prisma.post.findMany({
    where: { published: true },
    select: {
      title: true,
      summary: true,
      publishedAt: true,
      slug: true,
      publishedAt: true,
      updatedAt: true,
      metaTitle: true,
      imageUrl: true,
      metaDesc: true,
      metaKeywords: true,
    },
  });

  if (!meta) {
    throw new AppError("Resource not found", 404);
  }

  res.status(200).json({
    status: "success",
    data: meta,
  });
});

export const getSpecificPostMetadata = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    throw new AppError("Resource not found", 400);
  }
  const post = await prisma.post.findUnique({
    where: { slug: slug, published: true },
    select: {
      title: true,
      imageUrl: true,
      publishedAt: true,
      metaDesc: true,
      metaKeywords: true,
      metaTitle: true,
      summary: true,

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
