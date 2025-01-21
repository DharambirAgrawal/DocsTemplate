import mongoose, { Document, Schema } from 'mongoose';
import { IProfile } from '../user/ProfileModel';
// Author-specific Schema (extends the base profile)
interface IAuthor extends IProfile {
  bio?: string;
  title?: string;
  posts: mongoose.Types.ObjectId[];
}

const AuthorSchema: Schema<IAuthor> = new Schema({
  bio:  { type: String, default: null, trim: true },
  title:  { type: String, default: null, trim: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

const Author = mongoose.model<IAuthor>('Author', AuthorSchema);
export default Author;
