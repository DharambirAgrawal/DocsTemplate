import mongoose, { Schema, Document, Types } from 'mongoose';
import { hashData } from '../../utils/utils';

// Define AccountStatus Enum
export enum AccountStatus {
  active = 'ACTIVE',
  suspended = 'SUSPENDED',
  inactive = 'INACTIVE',
  pending = 'PENDING',
}

// Define UserRole Enum
export enum UserRole {
  user = 'USER',
  admin = 'ADMIN',
  author = 'AUTHOR',
}

export enum LoginProvider {
  email = 'EMAIL',
  google = 'GOOGLE',
  facebook = 'FACEBOOK',
  github = 'GITHUB',
  twitter = 'TWITTER',
}
// User Schema
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  image:string;
  password: string;
  accountStatus: AccountStatus;
  isEmailVerified: boolean;
  verificationToken?: string;
  role: UserRole;
  failedLoginAttempts: number;
  lockoutUntil?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  loginProvider: string;
  providerId?: string;
  providerProfileImage?: string;
  createdAt: Date;
  updatedAt: Date;
  lastPasswordChange?: Date;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  image:{type:String, trim:true},
  email: { type: String, required: true, unique: true,trim: true },
  password: { type: String, trim: true },
  accountStatus: { type: String, enum: AccountStatus, default: AccountStatus.pending },
  isEmailVerified: { type: Boolean, default: false },
  verificationToken: { type: String, default: null },
  role: { type: String, enum: UserRole, default: UserRole.user },
  failedLoginAttempts: { type: Number, default: 0 },
  lockoutUntil: { type: Date, default: null },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },
  lastPasswordChange: { type: Date, default: null },
  loginProvider: { type: String, enum: LoginProvider, required: true ,default:"EMAIL"},
  providerId: { type: String, unique: true, sparse: true }, 
  providerProfileImage: { type: String }, 
}
,
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
}
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.password === null) {
    return next();
  }
  this.password = await hashData(this.password);
  next();
});

// userSchema.methods.CreateResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(32).toString("hex");
//   this.passwordResetToken = encryption(resetToken);
//   this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000; //time in milisecond
//   console.log(resetToken, this.passwordResetToken);
//   return resetToken;
// };

const User = mongoose.model<IUser>('User', userSchema);
export default User;
