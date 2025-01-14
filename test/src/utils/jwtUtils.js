import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";

/**
 * Generates a JWT token with an email and expiration time.
 *
 * @param {object} payload - The payload to embed in the token.
 * @param {string} secretKey - The secret key for encoding the token.
 * @param {number} expiresInMinutes - The token's expiration time in minutes.
 * @returns {string} - A JWT token as a string.
 */
export function generateToken(payload, secret, expiresInMinutes = 5) {
  // Define expiration time
  const options = expiresInMinutes ? { expiresIn: `${expiresInMinutes}m` } : {};

  // Generate and return the token
  return jwt.sign(payload, secret, options);
}

/**
 * Decodes a JWT token to extract the payload.
 *
 * @param {string} token - The JWT token to decode.
 * @param {string} secretKey - The secret key used to sign the token.
 * @returns {object|string} - The decoded payload or an error message.
 */
export function decodeToken(token, secret) {
  try {
    const payload = jwt.verify(token, secret);
    return payload; // Includes 'email' and other data
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Token has expired", 500);
    } else if (error.name === "JsonWebTokenError") {
      throw new AppError("Invalid token", 500);
    } else {
      throw new AppError("An error occurred", 500);
    }
  }
}

export function generateUniqueId() {
  return "id-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
