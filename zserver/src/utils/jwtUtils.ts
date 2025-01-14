import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

/**
 * Defines the structure of the payload for the JWT.
 */
interface TokenPayload {
  [key: string]: any; // Allow other fields to be added dynamically
}

/**
 * Generates a JWT token with a given payload, secret key, and expiration time.
 * 
 * @param {TokenPayload} payload - The payload to embed in the token.
 * @param {string} secret - The secret key for encoding the token.
 * @param {number} expiresInMinutes - The token's expiration time in minutes (default: 5).
 * @returns {string} - A JWT token as a string.
 */
export function generateToken(payload: TokenPayload, secret: string, expiresInMinutes: number = 5): string {
  // Define expiration time
  const options = { expiresIn: `${expiresInMinutes}m` };

  // Generate and return the token
  return jwt.sign(payload, secret, options);
}

/**
 * Decodes a JWT token to extract the payload.
 * 
 * @param {string} token - The JWT token to decode.
 * @param {string} secret - The secret key used to sign the token.
 * @returns {JwtPayload | string} - The decoded payload or an error message.
 */
export function decodeToken(token: string, secret: string): TokenPayload  {
  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    return payload; // Includes 'email' and other data
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      throw new AppError('Token has expired', 500);
    } else if (error.name === 'JsonWebTokenError') {
      throw new AppError('Invalid token', 500);
    } else {
      throw new AppError('An error occurred while decoding the token', 500);
    }
  }
}

/**
 * Generates a unique ID.
 * 
 * @returns {string} - A unique string ID.
 */
export function generateUniqueId(): string {
  return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}
