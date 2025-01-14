import mongoose, { Schema, Document } from 'mongoose';

// SessionMetadata Schema
export interface ISessionMetadata extends Document {
  sessionId: string;
  platform?: string;
  userAgent?: string;
  browser?: string;
  language?: string;
  ip?: string;
  deviceFingerprint?: string;
  timezoneOffset?: number;
}

const sessionMetadataSchema = new Schema<ISessionMetadata>({
  sessionId: { type: String, unique: true, required: true },
  platform: { type: String, default: null },
  userAgent: { type: String, default: null },
  browser: { type: String, default: null },
  language: { type: String, default: null },
  ip: { type: String, default: null },
  deviceFingerprint: { type: String, default: null },
  timezoneOffset: { type: Number, default: null },
});

const SessionMetadata = mongoose.model<ISessionMetadata>('SessionMetadata', sessionMetadataSchema);
export default SessionMetadata;
