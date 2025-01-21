import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../errors/catchAsync';
import { AppError } from '../../errors/AppError';
import { decodeToken } from '../../utils/jwtUtils';
export const checkIfAdmin= catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
      throw new AppError("Invalid request", 404);
    }
    const { email, role, type } = await decodeToken(
      token,
      process.env.JWT_TOKEN_SECRET
    );
})

