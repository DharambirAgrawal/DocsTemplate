export function generateUniqueSlug(title: string) {
  // Generate the basic slug from the title
  const baseSlug = title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, ""); // Remove non-word characters except hyphens

  return baseSlug;
}
