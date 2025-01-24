import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../errors/catchAsync';
import { AppError } from '../../errors/AppError';
import { decodeToken } from '../../utils/jwtUtils';
import { refreshTokenPayload } from '../../config/tokenPayload';
import Session from '../../models/auth/sesssion.model';
// export const checkIfAdmin= catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.cookies.token;
//     if (!token) {
//       throw new AppError("Invalid request", 404);
//     }
//     const { email, role, type } = await decodeToken(
//       token,
//       process.env.JWT_TOKEN_SECRET
//     );
// })

export const verifyRefreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const  {refreshToken}= req.cookies;
   if(!refreshToken){
   next()
   }
   const {type, sessionId, email}= await decodeToken(refreshToken,process.env.JWT_TOKEN_SECRET);
   if(type != refreshTokenPayload.type){
         throw new AppError("Invalid request", 404);
   }
   const session = await Session.findOne({ sessionId })
   .populate('userId'); // Populate the user data from the `userId` field in the session

 if (!session) {
   throw new AppError("Session not found", 404);
 }
if(session.userId.email != email || session.userId.accountStatus != "ACTIVE" || session.isRevoked || session.expiresAt <= new Date() || !session.userId.isEmailVerified ){
    await session.deleteOne();
    throw new AppError("Invalid request", 404);
}
//    console.log(email,role,type);
   return res.json({
    status: 'success',
    data:{
        email,
        role: session.userId.role,
    }
   })
    
});

