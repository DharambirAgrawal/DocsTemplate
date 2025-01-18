import { generateToken,generateUniqueId } from "../../utils/jwtUtils";
import User from "../../models/auth/user.model";
import { refreshTokenPayload ,accessTokenPayload} from "../../config/tokenPayload";
export const googleLogin = async (req: any, res: any) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  console.log(req.user);
  const {sub, name, given_name, family_name, picture, email, email_verified} = req.user.user._json;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    const newUser = new User({
      providerId: sub,
      firstName: given_name,
      lastName: family_name,
      email: email,
      providerProfileImage: picture || null,
      isEmailVerified: true,
      role: "USER",
      loginProvider: "GOOGLE",
    });
    await newUser.save();
    return res.redirect();
  }
  const sessionId = generateUniqueId();
  const payload = {
    sessionId: sessionId,
    email: email,
  };
  const refreshToken = generateToken(
    { ...refreshTokenPayload, ...payload },
    process.env.JWT_TOKEN_SECRET,
    10080
  ); // 7 day
  const accessToken = generateToken(
    { ...accessTokenPayload, ...payload },
    process.env.JWT_TOKEN_SECRET,
    1440
  ); // 1 day

  const newSession = new Session({
    userId: existingUser._id, // Reference the user _id
    sessionId: sessionId,
    refreshToken: refreshToken, // Replace with actual logic to generate a refresh token
    accessToken: accessToken, // Replace with actual logic to generate an access token
    expiresAt: new Date(Date.now() + 10080000), // Set expiration time (e.g., 1 hour from now)
    lastActiveAt: new Date(),
    isRevoked: false,
  });

  // Save the session to the database
  const savedSession = await newSession.save();

  if (!savedSession) {
    throw new AppError("Failed to create session", 500);
  }

  // Add this session's _id to the user's sessionIds array
  existingUser.sessionIds.push(savedSession._id as mongoose.Types.ObjectId); // Push the new session's _id
  existingUser.lockoutUntil = undefined;

  existingUser.failedLoginAttempts = 0;

  await existingUser.save();
  // Send tokens as response
  // res.cookie("refreshToken", req.user.refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "PRODUCTION",
  //   sameSite: "Strict",
  // });
  res.redirect(
    "https://upgraded-space-meme-gv67xr5w9572wvx9-3000.app.github.dev/dashboard/home"
  );
  //   res.json({
  //     accessToken: req.user.accessToken,
  //     refreshToken: req.user.refreshToken, // Optional (can be stored in cookies)
  //   });
};
