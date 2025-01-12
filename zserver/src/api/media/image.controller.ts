import { deleteCloudinaryImage, cloudinaryUpload, updateCloudinaryImageMetaData } from "../../services/cloudinaryService";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import Image from "../../models/media/ImageModel";
import { separateCloudinaryBaseUrl } from "../../services/utils";

export const saveImageData = async (req: Request, res: Response) => {
  if (!req.files || (Array.isArray(req.files) && req.files.length === 0) || (!Array.isArray(req.files) && Object.keys(req.files).length === 0)) {
    throw new AppError("No image found", 400);
  }

  // Check if req.files is an array or an object
  const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();

  // Saving image data to the database and cloudinary
  for (const file of files) {
    const { buffer, originalname } = file;
    const folder = "pathgurus/blog";
    const { secure_url, public_id, format, created_at } = await cloudinaryUpload(buffer, folder);
    const mainUrl = separateCloudinaryBaseUrl(secure_url);

    const newImage = new Image({
      url: mainUrl,
      publicId: public_id,
      format: format,
      createdAt: created_at,
      title: originalname,
    });

    await newImage.save();
  }

  res.status(200).json({ message: "Saved image data successfully" });
};

export const UpdateImageData = async (req: Request, res: Response) => {
  const { url, title, description, tags, publicId, altText } = req.body;
  
  // Check if url or publicId is provided
  if (!url || !publicId) {
    throw new AppError("Resource not found", 400);
  }

  // Find the image by publicId in the MongoDB database
  const image = await Image.findOne({ publicId: publicId });

  // If the image is not found, throw an error
  if (!image) {
    throw new AppError("Image not found", 404);
  }

  // Update image metadata in Cloudinary
  await updateCloudinaryImageMetaData(publicId, {
    title: title || image.title,
    description: description || image.description,
    tags: tags || image.tags,
    altText: altText || image.altText,
  });

  // Update the image data in the MongoDB database
  const updatedImage = await Image.findOneAndUpdate(
    { publicId: publicId }, // Find the image by publicId
    {
      title: title || image.title,
      description: description || image.description,
      tags: tags || image.tags,
      altText: altText || image.altText,
    },
    { new: true } // Return the updated image
  );

  // If the image was not updated, throw an error
  if (!updatedImage) {
    throw new AppError("Image not updated", 500);
  }

  // Respond with the updated image data
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
};

export const deleteImage = async (req: Request, res: Response) => {
  const { publicId } = req.body;

  // Check if publicId is provided
  if (!publicId) {
    throw new AppError("Resource not found", 400);
  }

  // Find the image by publicId in the MongoDB database
  const image = await Image.findOne({ publicId: publicId });

  // If the image is not found, throw an error
  if (!image) {
    throw new AppError("Resource not found", 404);
  }

  // Delete the image from the MongoDB database
  await Image.deleteOne({ publicId: publicId });

  // Delete the image from Cloudinary
  await deleteCloudinaryImage(publicId);

  // Respond with a success message
  res.status(200).json({ message: "Image deleted successfully" });
};

export const getImages = async (req: Request, res: Response) => {
  const { id, page = 1, recent = false } = req.query;

  // Check if page is provided
  if (!page) {
    throw new AppError("Page parameter is required", 400);
  }

  // If id is provided, fetch a specific image
  if (id) {
    const image = await Image.findOne({ publicId: id });
    if (!image) {
      throw new AppError("Image not found", 404);
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

  // Pagination: set the number of images per page (e.g., 10 images per page)
  const limit = 10;
  const skip = (Number(page) - 1) * limit;

  // Get all images with pagination and filtering by recent
  const images = await Image.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: recent === "true" ? -1 : 1 }) // Order by recent or oldest
    .select("title url description altText publicId tags createdAt");

  // Map images to include full URL
  const filterImages = images.map((image) => {
    const { url, title, description, altText, publicId, tags, createdAt } = image;
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

  res.status(200).json({
    status: "success",
    images: filterImages,
  });
}