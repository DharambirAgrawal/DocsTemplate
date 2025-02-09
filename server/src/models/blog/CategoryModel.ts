import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
  name: string;
  slug: string;
  posts: mongoose.Types.ObjectId[];
  updatedAt: Date;
  createdAt: Date;
}

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
