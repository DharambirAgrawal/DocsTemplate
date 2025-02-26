import { Request, Response, NextFunction } from "express";
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
  console.log(req);
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
//   const authorId = "id-1737563022519-63pbj05no";

//   const author = await Author.findOne({ userId: authorId });
//   const response = await fetch("http://localhost:8000/api/transfer/transfer");
//   const data = await response.json();

//   if (!author) {
//     throw new AppError("Author not found", 400);
//   }

//   // We need to handle multiple posts
//   const postsCreated = await Promise.all(
//     data.data.map(async (postData: any) => {
//       // Create or connect categories
//       const categoriesToConnectOrCreate = postData.categories.map(
//         async (category: { name: string }) => {
//           let categoryDoc = await Category.findOne({
//             slug: generateUniqueSlug(category.name),
//           });
//           if (!categoryDoc) {
//             categoryDoc = await Category.create({
//               name: category.name,
//               slug: generateUniqueSlug(category.name),
//             });
//           }
//           return categoryDoc._id;
//         }
//       );

//       // Create or connect tags
//       const tagsToConnectOrCreate = postData.tags.map(
//         async (tag: { name: string }) => {
//           let tagDoc = await Tag.findOne({
//             slug: generateUniqueSlug(tag.name),
//           });
//           if (!tagDoc) {
//             tagDoc = await Tag.create({
//               name: tag.name,
//               slug: generateUniqueSlug(tag.name),
//             });
//           }
//           return tagDoc._id;
//         }
//       );

//       // Wait for all categories and tags to be populated
//       const [categoryIds, tagIds] = await Promise.all([
//         Promise.all(categoriesToConnectOrCreate),
//         Promise.all(tagsToConnectOrCreate),
//       ]);

//       // Prepare data for saving the post
//       const postDataToSave = {
//         title: postData.title,
//         timeRead: postData.timeRead,
//         publishedAt: postData.publishedAt,
//         createdAt: postData.createdAt,
//         updatedAt: postData.updatedAt,
//         content: postData.content,
//         summary: postData.summary,
//         expiresAt: postData.expiresAt,
//         imageUrl: postData.imageUrl,
//         views: postData.views,
//         metaData: {
//           metaTitle: postData.metaTitle,
//           metaDesc: postData.metaDesc,
//           metaKeywords: postData.metaKeywords,
//           metaImage: postData.metaImage,
//         },
//         authorId: author._id,
//         categories: categoryIds,
//         tags: tagIds,
//         status: postData.status,
//         published: postData.published,
//       };

//       const newPost = new Post(postDataToSave);
//       // Create a new post
//       await newPost.saveSlug();
//       await newPost.save();

//       if (!newPost) {
//         throw new AppError("Post not created", 400);
//       }

//       //updating author
//       author.posts.push(newPost._id);
//       await author.save();

//       await Promise.all(
//         categoryIds.map(async (categoryId) => {
//           const category = await Category.findById(categoryId);
//           if (category) {
//             category.posts.push(newPost._id as Types.ObjectId); // Add new post ID to the category's posts
//             await category.save();
//           }
//         })
//       );

//       await Promise.all(
//         tagIds.map(async (tagId) => {
//           const tag = await Tag.findById(tagId);
//           if (tag) {
//             tag.posts.push(newPost._id as Types.ObjectId); // Add new post ID to the tag's posts
//             await tag.save();
//           }
//         })
//       );

//       return { slug: newPost.slug }; // Return the slug for each created post
//     })
//   );

//   res.status(200).json({
//     success: true,
//     data: postsCreated, // Return all the slugs of created posts
//   });
// };

// export const transfer_data = async (req: Request, res: Response) => {
//   const authorId = "id-1737563022519-63pbj05no";

//   const author = await Author.findOne({ userId: authorId });
//   const response = await fetch("http://localhost:8000/api/transfer/transfer");
//   const data1 = await response.json();
//   const data = data1.data;

//   // Make sure author exists
//   if (!author) {
//     throw new AppError("Author not found", 400);
//   }

//   // Process all posts in the data array
//   for (const postData of data) {
//     // Create or connect categories
//     const categoriesToConnectOrCreate = postData.categories.map(
//       async (category: { name: string }) => {
//         let categoryDoc = await Category.findOne({
//           slug: generateUniqueSlug(category.name),
//         });
//         if (!categoryDoc) {
//           categoryDoc = await Category.create({
//             name: category.name,
//             slug: generateUniqueSlug(category.name),
//           });
//         }
//         return categoryDoc._id;
//       }
//     );

//     // Create or connect tags
//     const tagsToConnectOrCreate = postData.tags.map(
//       async (tag: { name: string }) => {
//         let tagDoc = await Tag.findOne({ slug: generateUniqueSlug(tag.name) });
//         if (!tagDoc) {
//           tagDoc = await Tag.create({
//             name: tag.name,
//             slug: generateUniqueSlug(tag.name),
//           });
//         }
//         return tagDoc._id;
//       }
//     );

//     // Wait for all categories and tags to be populated
//     const [categoryIds, tagIds] = await Promise.all([
//       Promise.all(categoriesToConnectOrCreate),
//       Promise.all(tagsToConnectOrCreate),
//     ]);

//     // Prepare post data for saving
//     const postDataForSave = {
//       title: postData.title,
//       timeRead: postData.timeRead,
//       publishedAt: postData.publishedAt,
//       createdAt: postData.createdAt,
//       updatedAt: postData.updatedAt,
//       content: postData.content,
//       summary: postData.summary,
//       expiresAt: postData.expiresAt,
//       imageUrl: postData.imageUrl,
//       views: postData.views,
//       metaData: {
//         metaTitle: postData.metaTitle,
//         metaDesc: postData.metaDesc,
//         metaKeywords: postData.metaKeywords,
//         metaImage: postData.metaImage,
//       },
//       authorId: author._id,
//       categories: categoryIds,
//       tags: tagIds,
//       status: postData.status,
//       published: postData.published,
//     };

//     // Create and save the new post
//     const newPost = new Post(postDataForSave);
//     await newPost.saveSlug();
//     await newPost.save();

//     // If post creation fails
//     if (!newPost) {
//       throw new AppError("Post not created", 400);
//     }

//     // Associate the new post with the author
//     author.posts.push(newPost._id);
//     await author.save();

//     // Update the categories and tags with the new post ID
//     await Promise.all(
//       categoryIds.map(async (categoryId) => {
//         const category = await Category.findById(categoryId);
//         if (category) {
//           category.posts.push(newPost._id as Types.ObjectId);
//           await category.save();
//         }
//       })
//     );

//     await Promise.all(
//       tagIds.map(async (tagId) => {
//         const tag = await Tag.findById(tagId);
//         if (tag) {
//           tag.posts.push(newPost._id as Types.ObjectId);
//           await tag.save();
//         }
//       })
//     );
//   }

//   // Send response after processing all posts
//   res.status(200).json({
//     success: true,
//     message: "All posts transferred successfully.",
//   });
// };

// // export const test = async (req: Request, res: Response) => {
// //   const tag = await Tag.find().lean();

// //   res.status(200).json({
// //     data: tag,
// //   });
// // };
// export const test = async (req: Request, res: Response) => {
//   const tags = await Tag.find().lean();

//   // Create a map to track the frequency of names
//   const nameFrequency: { [key: string]: number } = {};

//   // Iterate over the tags to count the occurrences of each name
//   tags.forEach((tag) => {
//     const name = tag.name;
//     nameFrequency[name] = (nameFrequency[name] || 0) + 1;
//   });

//   // Filter out the names that are repeated (frequency > 1)
//   const repeatedNames = Object.keys(nameFrequency).filter(
//     (name) => nameFrequency[name] > 1
//   );

//   res.status(200).json({
//     data: tags,
//     repeatedNames, // Return the repeated names as part of the response
//   });
// };
