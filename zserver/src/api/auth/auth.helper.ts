import { sendEmail } from '../../services/emailService';
import { VERIFY_EMAIL_MESSAGE } from '../../utils/EmailMessages';
import { AppError } from '../../errors/AppError';
import { validateEmail } from '../../utils/utils';
import { generateToken } from '../../utils/jwtUtils';
import { verifyEmailPayload } from '../../config/tokenPayload';
import User from '../../models/auth/user.model';

export const SendEmailVerificationEmail = async ({email}:{email:string})=>{

    if (!email) {
      throw new AppError('Resource not found', 400);
    }
  
    //validating email
    if (!validateEmail(email)) {
      throw new AppError('Invalid Email!', 400);
    }
  
    //Checking if user exists
    const payload = {
      ...verifyEmailPayload,
      email: email
    }
    const token = generateToken(payload, process.env.VERIFY_EMAIL_SECRET)
  
    const updateUser= await User.findOneAndUpdate({ email },
        {
            verificationToken: token,
            isVerified: false
        }
    )
  
    const link = `${process.env.BASE_URL}/api/auth/register/${token}`
    await sendEmail({TO:email,message: VERIFY_EMAIL_MESSAGE({link:link})})
  
  
    if (!updateUser) {
      throw new AppError('Server Error Try again!', 500);
    }
  
    return {
      status: 'success',
      message: 'Verification email sent successfully',
    }
}