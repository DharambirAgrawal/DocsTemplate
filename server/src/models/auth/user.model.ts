import mongoose, { Schema, Document, Types, UpdateQuery } from 'mongoose';
import { hashData } from '../../utils/utils';
import { generateUniqueId } from '../../utils/jwtUtils';
// Define AccountStatus Enum
export enum AccountStatus {
  active = 'ACTIVE',
  pending = 'PENDING',
  inactive = 'INACTIVE',
  suspended = 'SUSPENDED',
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
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profile: Types.ObjectId;
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
  sessionIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  lastPasswordChange?: Date;
}

const userSchema = new Schema<IUser>({
  userId: { type: String, unique: true, required: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  image:{type:String, trim:true},
  email: { type: String, required: true, unique: true,trim: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  password: { type: String, trim: true },
  accountStatus: { type: String, enum: AccountStatus, default: AccountStatus.pending },
  isEmailVerified: { type: Boolean, default: false },
  verificationToken: { type: String, default: null },
  role: { type: String, enum: UserRole, default: UserRole.user },
  failedLoginAttempts: { type: Number, default: 0 },
  lockoutUntil: { type: Date , default: null },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },
  lastPasswordChange: { type: Date, default: null },
  loginProvider: { type: String, enum: LoginProvider, required: true ,default:"EMAIL"},
  providerId: { type: String, unique: true, sparse: true }, 
  providerProfileImage: { type: String }, 
  sessionIds: [{ type: Types.ObjectId, ref: 'Session' }],
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
  this.userId = generateUniqueId();
  this.password = await hashData(this.password);
  next();
});



userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as UpdateQuery<IUser>; // Assert the type here

  if (!update || !update.password) {
    return next();
  }

  // Check if the password is being updated and hash it
  update.password = await hashData(update.password); // hash the password before saving

  next();
});



const User = mongoose.model<IUser>('User', userSchema);
export default User;
