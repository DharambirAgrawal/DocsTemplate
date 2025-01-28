import Author from "../../models/blog/AuthorModel";
import { AppError } from "../../errors/AppError";
export function generateUniqueSlug(title: string){
    // Generate the basic slug from the title
    const baseSlug = title
    .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")    // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, "");  // Remove non-word characters except hyphens
  
    return baseSlug
  }

  
  export const createAuthor = async (userId: string) => {
    
                 
    const author = new Author({
      userId: userId,
    });
  
    await author.save();
    if (!author) {
      throw new AppError("Error while creating author", 400);
    }
  
    return {
      status: "success",
      message: "Author created successfully",
    }
  };