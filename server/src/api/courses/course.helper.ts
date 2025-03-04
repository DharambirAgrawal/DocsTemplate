export function generateUniqueSlug(title: string) {
  // Generate the basic slug from the title
  const baseSlug = title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, ""); // Remove non-word characters except hyphens

  return baseSlug;
}
export function fixOrder(objects: any) {
  // Step 1: Sort the objects by their current 'order'
  const sortedObjects = [...objects].sort((a, b) => a.order - b.order);

  // Step 2: Reassign 'order' starting from 1 to n
  return sortedObjects.map((obj, index) => ({
    ...obj,
    order: index + 1, // Reassign order
  }));
}
