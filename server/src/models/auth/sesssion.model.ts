import mongoose, { Schema, Document } from 'mongoose';
import { ISessionMetadata } from './sessionMetadata.model';

// Session Schema
export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  sessionId: string;
  refreshToken: string;
  accessToken: string;
  isRevoked: boolean;
  expiryReason?: string;
  lastActiveAt: Date;
  createdAt: Date;
  expiresAt: Date;
  metadata?: ISessionMetadata;
}

const sessionSchema = new Schema<ISession>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sessionId: { type: String, unique: true, required: true },
  refreshToken: { type: String, required: true },
  accessToken: { type: String, required: true },
  isRevoked: { type: Boolean, default: false },
  expiryReason: { type: String, default: null },
  lastActiveAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  metadata: { type: Schema.Types.Mixed, default: null },
},
{
    timestamps: { createdAt: 'createdAt', updatedAt: false},
}
    );

const Session = mongoose.model<ISession>('Session', sessionSchema);
export default Session;
