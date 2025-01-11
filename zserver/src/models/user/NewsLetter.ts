import mongoose, { Document, Schema } from 'mongoose';

interface INewsletter extends Document {
  email: string;
  status: string;
  unsubscribeToken?: string;
  createdAt: Date;
  updatedAt: Date;
}
export enum PostStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  EXPIRED='EXPIRED'
}

const NewsletterSchema: Schema<INewsletter> = new Schema({
  email: { type: String, required: true, unique: true },
   status: {
      type: String,
      enum: Object.values(PostStatus),
      default: PostStatus.ACTIVE
    },
  unsubscribeToken: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Newsletter = mongoose.model<INewsletter>('Subscription', NewsletterSchema);
export default Newsletter;
