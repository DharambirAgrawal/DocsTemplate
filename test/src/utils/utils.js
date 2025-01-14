import bcrypt from "bcryptjs";
import { prisma } from "../../app.js";

export function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  ) {
    return true;
  } else {
    return false;
  }
}

export async function hashData(data) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
}

/**
 * Compare a plain password with a hashed password.
 * @param {string} plainPassword - The plain password entered by the user.
 * @param {string} hashedPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} - Returns true if passwords match, false otherwise.
 */
export async function comparePasswords(plainPassword, hashedPassword) {
  try {
    // Compare the plain password with the hashed password
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new AppError("Error comparing passwords", 500);
  }
}

export async function generateUniqueSlug(title) {
  // Generate the basic slug from the title
  let baseSlug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");

  let slug = baseSlug;
  let slugExists = await prisma.post.findUnique({
    where: { slug: slug },
  });

  // If the slug already exists, append a number to make it unique
  let counter = 1;
  while (slugExists) {
    slug = `${baseSlug}-${counter}`;
    slugExists = await prisma.post.findUnique({
      where: { slug: slug },
    });
    counter++;
  }

  return slug;
}
