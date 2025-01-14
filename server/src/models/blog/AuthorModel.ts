import mongoose, { Document, Schema } from 'mongoose';

interface IAuthor extends Document {
  firstName: string;
  lastName:string;
  email: string;
  title?: string;
  bio?:string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  image: string;
  summary?: string;
  posts: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema: Schema<IAuthor> = new Schema({
  firstName: { type: String, required: true },
  lastName:{ type: String, required: true },
  email: { type: String, required: true, unique: true },
  title: { type: String, default: null },
  bio: { type: String, required: true },
  socialLinks: {
    twitter: { type: String, default: null },
    linkedin: { type: String, default: null },
    facebook: { type: String, default: null },
    instagram: { type: String, default: null },
  },
  image: { type: String, default: "https://res.cloudinary.com/dsz3rgtpj/image/upload/v1735494360/avatar-2388584_1920_ja1zf5.png" },
  summary: { type: String, default: null },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Author = mongoose.model<IAuthor>('Author', AuthorSchema);
export default Author;
