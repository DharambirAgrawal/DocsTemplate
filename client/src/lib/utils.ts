import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


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

export function formatDate(inputDate: string) {
  const date = new Date(inputDate);

  // Get day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' }); // 'long' gives full month name
  const year = date.getFullYear();

  // Format the date to "6 August 2024"
  return `${day} ${month} ${year}`;
}

