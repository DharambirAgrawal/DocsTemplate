import mongoose, { Document, Schema } from 'mongoose';
import { DEFAULT_USER_IMAGE } from '../../utils/data';

export interface IProfile extends Document {
    firstName: string;
    lastName:string;
    email: string;
    socialLinks?: {
      twitter?: string;
      linkedin?: string;
      facebook?: string;
      instagram?: string;
    };
    image: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  const ProfileSchema: Schema<IProfile> = new Schema({
    firstName: { type: String, required: true },
    lastName:{ type: String, required: true },
    email: { type: String, required: true, unique: true },
    socialLinks: {
      twitter: { type: String, default: null },
      linkedin: { type: String, default: null },
      facebook: { type: String, default: null },
      instagram: { type: String, default: null },
    },
    image: { type: String, default: DEFAULT_USER_IMAGE },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);
  export default Profile;


