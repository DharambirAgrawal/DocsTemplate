import mongoose, { Document, Schema } from 'mongoose';
import { DEFAULT_POST_IMAGE } from '../../utils/data';

// Enum for PostStatus
export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

// MetaData Interface for better typing
interface IPostMetaData {
  metaTitle?: string;
  metaDesc?: string;
  metaKeywords?: string;
  metaImage: string;
}

interface IPost extends Document {
  title: string;
  views: number;
  publishedAt: Date;
  timeRead?: string;
  slug: string;
  content?: string;
  summary?: string;
  imageUrl: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
  authorId?: mongoose.Types.ObjectId;
  categories: mongoose.Types.ObjectId[];
  tags: mongoose.Types.ObjectId[];
  metaData: IPostMetaData; // Typed metaData
  status: PostStatus;
}

const PostSchema: Schema<IPost> = new Schema(
  {
    title: { type: String, required: true, trim:true },
    views: { type: Number, default: 0 },
    publishedAt: { type: Date, default: Date.now },
    timeRead: { type: String, default: null },
    slug: { type: String, unique: true, required: true, trim:true },
    content: { type: String, default: null },
    summary: { type: String, default: null , trim:true},
    imageUrl: { type: String, default: DEFAULT_POST_IMAGE, trim:true },
    published: { type: Boolean, default: false },
   
    expiresAt: { type: Date, default: null },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', default: null },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    metaData: {
      metaTitle: { type: String, default: null, trim:true },
      metaDesc: { type: String, default: null , trim:true},
      metaKeywords: { type: String, default: null },
      metaImage: { type: String, default: DEFAULT_POST_IMAGE, trim:true },
    },
    status: {
      type: String,
      enum: Object.values(PostStatus),
      default: PostStatus.DRAFT,
    },
  },
  { timestamps: true } // Automatically handle createdAt and updatedAt fields
);

const Post = mongoose.model<IPost>('Post', PostSchema);
export default Post;
