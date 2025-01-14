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

// User Schema
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountStatus: AccountStatus;
  isEmailVerified: boolean;
  verificationToken?: string;
  role: UserRole;
  failedLoginAttempts: number;
  lockoutUntil?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  lastPasswordChange?: Date;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },

  email: { type: String, required: true, unique: true,trim: true },
  password: { type: String, required: true, trim: true },
  accountStatus: { type: String, enum: AccountStatus, default: AccountStatus.pending },
  isEmailVerified: { type: Boolean, default: false },
  verificationToken: { type: String, default: null },
  role: { type: String, enum: UserRole, default: UserRole.user },
  failedLoginAttempts: { type: Number, default: 0 },
  lockoutUntil: { type: Date, default: null },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },
  lastPasswordChange: { type: Date, default: null },
}
,
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
}
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
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