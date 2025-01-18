// import { Response , Request} from 'express';
// import { decodeToken, generateToken } from '../../utils/jwtUtils';
// import { publicCookiePayload } from '../../config/tokenPayload';
// import { AppError } from '../../errors/AppError';

// export const verifyCookie = async(req: Request,res: Response,) => {
//     const token = req.cookies.token;
//     if (!token) {
//       throw new AppError("Invalid request", 404);
//     }
//     // Verify the token
//     const payload = decodeToken(token, process.env.COOKIE_SECRET);
//     const { type } = payload as { type: string };
//     if (type !== 'PUBLIC_COOKIE') {
//       throw new AppError('Invalid token', 403);
//     }
//     res.send('Cookie Verified')
// }