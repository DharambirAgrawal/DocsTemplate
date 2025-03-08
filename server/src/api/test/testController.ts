import { Request, Response, NextFunction } from "express";
import Image from "../../models/media/ImageModel";
// import { AppError } from "../../errors/AppError";
// import { generateUniqueSlug } from "../blog/blog.helper";
// import Category from "../../models/blog/CategoryModel";
// import Tag from "../../models/blog/TagModel";
// import Post from "../../models/blog/PostModel";
// import Author from "../../models/blog/AuthorModel";
// import { Types } from "mongoose";
// import exp from "constants";
export const testServer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // res.cookie("access_token", "access----------1------2-3", {
  //   // httpOnly: true, // Prevents access to the cookie via JavaScript
  //   secure: process.env.NODE_ENV === "PRODUCTION", // Only send over HTTPS in production
  //   sameSite: "none", // Prevents CSRF attacks
  //   maxAge: 1000 * 60 * 60 * 24 * 1, // Set the max age for the refresh token (e.g., 30 days)
  // });

  // // Set refresh token cookie
  // res.cookie("refresh_token", "Refrehh-------------------1------1", {
  //   // httpOnly: true, // Prevents access to the cookie via JavaScript
  //   secure: process.env.NODE_ENV === "PRODUCTION", // Only send over HTTPS in production
  //   sameSite: "none", // Prevents CSRF attacks
  //   maxAge: 1000 * 60 * 60 * 24 * 7, // Set the max age for the refresh token (e.g., 30 days)
  // });
  // res.header("Authorization", `Bearer ''sessionocvbo12323423948723948`);
  res.status(200).json({
    message: "Server is up and running",
    success: true,
  });
};
// export const transfer_data = async (req: Request, res: Response) => {
//   const authorId = "id-1737563022519-63pbj05no";

//   const author = await Author.findOne({ userId: authorId });
//   const response = await fetch("http://localhost:8000/api/transfer/transfer");
//   const data1 = await response.json();
//   const data = data1.data;

//   // Create or connect categories
//   const categoriesToConnectOrCreate = data[0].categories.map(
//     async (category: { name: string }) => {
//       let categoryDoc = await Category.findOne({
//         slug: generateUniqueSlug(category.name),
//       });
//       if (!categoryDoc) {
//         categoryDoc = await Category.create({
//           name: category.name,
//           slug: generateUniqueSlug(category.name),
//         });
//       }
//       return categoryDoc._id;
//     }
//   );
//   console.log("cccccccccccccccccccccccccccccccccccccccccc");

//   // Create or connect tags
//   const tagsToConnectOrCreate = data[0].tags.map(
//     async (tag: { name: string }) => {
//       let tagDoc = await Tag.findOne({ slug: generateUniqueSlug(tag.name) });
//       if (!tagDoc) {
//         tagDoc = await Tag.create({
//           name: tag.name,
//           slug: generateUniqueSlug(tag.name),
//         });
//       }
//       return tagDoc._id;
//     }
//   );
//   console.log("ttttttttttttttttttttttttttttttttttttttt");
//   // Wait for all categories and tags to be populated
//   const [categoryIds, tagIds] = await Promise.all([
//     Promise.all(categoriesToConnectOrCreate),
//     Promise.all(tagsToConnectOrCreate),
//   ]);

//   // Prepare data for saving the post
//   const postData = {
//     title: data[0].title,
//     timeRead: data[0].timeRead,
//     publishedAt: data[0].publishedAt,
//     createdAt: data[0].createdAt,
//     updatedAt: data[0].updatedAt,
//     content: data[0].content,
//     summary: data[0].summary,
//     expiresAt: data[0].expiresAt,
//     imageUrl: data[0].imageUrl,
//     views: data[0].views,
//     metaData: {
//       metaTitle: data[0].metaTitle,
//       metaDesc: data[0].metaDesc,
//       metaKeywords: data[0].metaKeywords,
//       metaImage: data[0].metaImage,
//     },
//     authorId: author._id,
//     categories: categoryIds,
//     tags: tagIds,
//     status: data[0].status,
//     published: data[0].published,
//   };
//   console.log(postData);
//   const newPost = new Post(postData);
//   // Create a new post
//   await newPost.saveSlug();
//   await newPost.save();

//   if (!newPost) {
//     throw new AppError("Post not created", 400);
//   }
//   if (!author) {
//     throw new AppError("Author not found", 400);
//   }

//   //updating author
//   author.posts.push(newPost._id);
//   await author.save();
//   await Promise.all(
//     categoryIds.map(async (categoryId) => {
//       const category = await Category.findById(categoryId);
//       if (category) {
//         category.posts.push(newPost._id as Types.ObjectId); // Add new post ID to the category's posts
//         await category.save();
//       }
//     })
//   );

//   await Promise.all(
//     tagIds.map(async (tagId) => {
//       const tag = await Tag.findById(tagId);
//       if (tag) {
//         tag.posts.push(newPost._id as Types.ObjectId); // Add new post ID to the category's posts
//         await tag.save();
//       }
//     })
//   );

//   res.status(200).json({
//     success: true,
//     data: newPost,
//   });
// };

// export const transfer_data = async (req: Request, res: Response) => {
//   try {
//     const response = await fetch("http://localhost:8000/api/transfer/transfer");
//     const data = await response.json();

//     // Assuming 'data' is an array of images
//     const savedImages = [];

//     // Loop through each item in the array and create a new image document
//     for (const imageData of data.data) {
//       const {
//         url,
//         createdAt,
//         updatedAt,
//         format,
//         altText,
//         title,
//         description,
//         tags,
//         publicId,
//       } = imageData;

//       // Create a new image document
//       const newImage = new Image({
//         url,
//         createdAt,
//         updatedAt,
//         format,
//         altText,
//         title,
//         description,
//         tags,
//         publicId,
//         folderName: "BLOG",
//       });

//       // Save the image document to the database
//       const savedImage = await newImage.save();

//       // Push the saved image data to an array
//       savedImages.push(savedImage);
//     }

//     // Return a response with all saved images
//     res.status(200).json({
//       success: true,
//       data: savedImages, // Return all the saved images
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while transferring data.",
//     });
//   }
// };
