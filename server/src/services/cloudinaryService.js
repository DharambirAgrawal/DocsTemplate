import { v2 as cloudinary } from "cloudinary";
import { AppError } from "../errors/AppError.js";
import { configCloudinary } from "../config/config.js";

cloudinary.config(configCloudinary);

export function separateBaseUrl(imageUrl) {
  const regex =
    /^(https:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload\/)(.*)$/;
  const match = imageUrl.match(regex);
  if (match) {
    const mainUrl = match[2]; // The remaining part, including version and public ID

    return mainUrl;
  } else {
    throw new Error("Invalid Cloudinary image URL");
  }
}

export const cloudinaryUpload = async (image, folder) => {
  try {
    if (!image || image.length === 0) {
      throw new AppError("No image found", 400);
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: folder,
            transformation: [
              { quality: "auto", fetch_format: "auto" }, // LQIP and auto optimization
            ],
          },
          (error, result) => {
            if (error) {
              new AppError("Error uploading image to Cloudinary", 500);
              reject(err);
            } else {
              resolve(result);
            }
          }
        )
        .end(image);
    });
  } catch (error) {
    throw new AppError("Error uploading image to Cloudinary", 500);
    console.log("cannot upload image", error);
  }
};

export const updateCloudinaryImageMetaData = async (publicId, data) => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.explicit(
        publicId,
        {
          type: "upload",
          context: data,
        },
        (error, result) => {
          if (error) {
            new AppError("Error updating image metadata", 500);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  } catch (error) {
    throw new AppError("Error updating image metadata", 500);
    console.log("cannot update image metadata", error);
  }
};

export const deleteCloudinaryImage = async (publicId) => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          new AppError("Error deleting image from Cloudinary", 500);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    throw new AppError("Error deleting image from Cloudinary", 500);
    console.log("cannot delete image", error);
  }
};
