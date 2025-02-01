import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import { AppError } from "../errors/AppError"; // Assuming this is a custom error class
import { configCloudinary } from "../config/config"; // Assuming this is where Cloudinary config is stored

// Initialize Cloudinary with configuration
cloudinary.config(configCloudinary);

// Type definition for the `data` argument in the `updateCloudinaryImageMetaData` function
interface ImageMetadata {
  tags: string[]; // Array of tags
  [key: string]: string | string[]; // Allow other metadata fields (string or an array of strings)
}

// Type definition for the cloudinaryUpload function parameters
export const cloudinaryUpload = async (image: Buffer,  data: ImageMetadata,  folder: string): Promise<UploadApiResponse> => {
  try {
    if (!image || image.length === 0) {
      throw new AppError("No image found", 400);
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: folder,
          transformation: [
            { quality: "auto", fetch_format: "auto" }, // LQIP and auto optimization
          ],
          context: {
            title: data.title || "",
            alt_text: data.altText || "",
            description: data.description || "",
            tags: data.tags.join(", "), // Join tags into a string, assuming it's an array
          },
        },
        (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
          if (error) {
            reject(new AppError("Error uploading image to Cloudinary", 500));
          } else if (result) {
            resolve(result);
          } else {
            reject(new AppError("Unknown error during upload", 500));
          }
        }
      ).end(image);
    });
  } catch (error) {
    throw new AppError("Error uploading image to Cloudinary", 500);
  }
};

// Function to update Cloudinary image metadata
export const updateCloudinaryImageMetaData = async (
  publicId: string,
  data: ImageMetadata
): Promise<UploadApiResponse> => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.explicit(
        publicId,
        {
          type: "upload",
          context: data,
        },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) {
            reject(new AppError("Error updating image metadata", 500));
          } else {
            resolve(result);
          }
        }
      );
    });
  } catch (error) {
    throw new AppError("Error updating image metadata", 500);
  }
};

// Function to delete a Cloudinary image
export const deleteCloudinaryImage = async (publicId: string): Promise<UploadApiResponse> => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error: UploadApiErrorResponse, result: UploadApiResponse) => {
        if (error) {
          reject(new AppError("Error deleting image from Cloudinary", 500));
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    throw new AppError("Error deleting image from Cloudinary", 500);
  }
};
