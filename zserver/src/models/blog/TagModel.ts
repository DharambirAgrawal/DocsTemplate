import mongoose, { Document, Schema } from 'mongoose';

interface ITag extends Document {
  name: string;
  slug: string;
  posts: mongoose.Types.ObjectId[];
  updatedAt: Date;
}

const TagSchema: Schema<ITag> = new Schema({
  name: { type: String, required: true, unique: true, trim:true },
  slug: { type: String, required: true, unique: true , trim: true},
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
}
,
{ timestamps: true }
);

const Tag = mongoose.model<ITag>('Tag', TagSchema);
export default Tag;
