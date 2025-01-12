import mongoose, { Document, Schema } from 'mongoose';


export enum folderName {
  BLOG = 'BLOG',
  MAIN = 'MAIN',
  USER = 'USER',
}
interface IImage extends Document {
  url: string;
  format: string;
  altText?: string;
  title?: string;
  description?: string;
  tags: string[];
  publicId: string;
  createdAt: Date;
  updatedAt: Date;
  folderName:folderName
}



const ImageSchema: Schema<IImage> = new Schema({
  url: { type: String, required: true, unique: true, trim:true },
  format: { type: String, required: true },
  altText: { type: String, default: null , trim:true},
  title: { type: String, default: null , trim:true},
  description: { type: String, default: null , trim:true},
  tags: { type: [String], default: [] , trim:true},
  publicId: { type: String, required: true, unique: true,  trim:true },
  folderName:{
     type: String,
    enum: Object.values(folderName),
  }
},
{ timestamps: true });

const Image = mongoose.model<IImage>('Image', ImageSchema);
export default Image;
