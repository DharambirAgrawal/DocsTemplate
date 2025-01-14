import Post from "../../models/blog/PostModel";

export async function generateUniqueSlug(title: string): Promise<string> {
    // Generate the basic slug from the title
    let baseSlug = title
      .toLowerCase()
      .replace(/\s+/g, "-")    // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, "");  // Remove non-word characters except hyphens
  
    let slug = baseSlug;
    let slugExists = await Post.findOne({ slug });
  
    // If the slug already exists, append a number to make it unique
    let counter = 1;
    while (slugExists) {
      slug = `${baseSlug}-${counter}`;
      slugExists = await Post.findOne({ slug });
      counter++;
    }
  
    return slug;
  }