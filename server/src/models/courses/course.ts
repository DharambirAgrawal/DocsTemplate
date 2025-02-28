import mongoose, { Document, Schema } from "mongoose";

// Interface for the Course document with metadata
export interface ICourse extends Document {
  title: string;
  description: string;
  duration: string; // E.g., '2 hours', '5 weeks', etc.
  level: "beginner" | "intermediate" | "advanced";
  category: string; // E.g., 'Web Development', 'Frontend', etc.
  slug: string; // Slug for SEO-friendly URL
  saveSlug: () => Promise<string>;
  authorId?: mongoose.Types.ObjectId;
  content: Array<{
    sectionTitle: string;
    sectionContent: string;
    slug: string; // Slug for SEO-friendly URL
    metadata: {
      sectionMetaTitle: string; // SEO title for the section
      sectionMetaDesc: string; // SEO description for the section
      sectionMetaKeywords: string[]; // SEO keywords for the section
    };
    createdAt: Date; // Timestamp for the section
    updatedAt: Date; // Timestamp for the section
  }>;
  createdAt: Date;
  updatedAt: Date;
  metadata: {
    tags: string[]; // Tags for better categorization and search
    views: number; // View count for the course
    seoTitle: string; // Custom SEO title for the page
    seoDescription: string; // Custom SEO description for the page
    seoKeywords: string[]; // Custom SEO keywords
  };
}

// Mongoose Schema for the Course with metadata
const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      required: true,
      enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      default: null,
    },
    content: [
      {
        sectionTitle: {
          type: String,
          required: true,
          trim: true,
        },
        sectionContent: {
          type: String,
          required: true,
        },
        slug: {
          type: String,
          required: true,
          unique: true,
          trim: true,
        },
        published: {
          type: Boolean,
          required: true,
          default: false,
        },
        metadata: {
          sectionMetaTitle: {
            type: String,
            required: true,
            trim: true,
          },
          sectionMetaDesc: {
            type: String,
            required: true,
            trim: true,
          },
          sectionMetaKeywords: {
            type: [String],
            required: true,
            default: [],
          },
        },
        // Add timestamps to each section
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    metadata: {
      tags: {
        type: [String],
        required: true,
        default: [],
      },
      views: {
        type: Number,
        required: true,
        default: 0,
      },
      seoTitle: {
        type: String,
        required: true,
        trim: true,
      },
      seoDescription: {
        type: String,
        required: true,
        trim: true,
      },
      seoKeywords: {
        type: [String],
        required: true,
        default: [],
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields for the whole document
  }
);

// Create a model from the schema
const Course = mongoose.model<ICourse>("Course", courseSchema);

export default Course;
