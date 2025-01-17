import bcrypt from 'bcryptjs';
import { AppError } from '../errors/AppError';

/**
 * Validates the format of an email address.
 * 
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Validates the strength of a password.
 * 
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if the password is strong, false otherwise.
 */
export function validatePassword(password: string): boolean {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
}

/**
 * Hashes a piece of data (e.g., password).
 * 
 * @param {string} data - The data to hash.
 * @returns {Promise<string>} - A promise that resolves to the hashed data.
 */
export async function hashData(data: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(data, salt);
}

/**
 * Compares a plain password with a hashed password.
 * 
 * @param {string} plainPassword - The plain password entered by the user.
 * @param {string} hashedPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} - Returns true if the passwords match, false otherwise.
 */
export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    // Compare the plain password with the hashed password
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new AppError('Error comparing passwords', 500);
  }
}


export function validateField(requiredFields:string[],fields:{[key: string]: string}): void {

  const missingFields = requiredFields.filter((field) => !fields[field]);
  if (missingFields.length > 0) {
    throw new AppError(
      `Missing required fields: ${missingFields.join(", ")}`,
      400
    );
  }
}