import mongoose, { Document, Schema } from "mongoose";
import { generateUniqueSlug } from "../../api/courses/course.helper";

interface ICourseContent extends Document {
  title: string;
  content: string;
  slug: string;
  order: number;
  metaData: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
  };
  saveSlug: () => Promise<string>;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema for Section
const courseContentSchema = new Schema<ICourseContent>(
  {
    title: {
      type: String,
      required: [true, "Section title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Section content is required"],
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    order: {
      type: Number,
      required: true,
      min: [0, "Order must be a positive number"],
    },
    metaData: {
      metaTitle: {
        type: String,
        required: [true, "SEO title is required"],
        trim: true,
      },
      metaDescription: {
        type: String,
        required: [true, "SEO description is required"],
        trim: true,
      },
      metaKeywords: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);
courseContentSchema.methods.saveSlug = async function () {
  const baseSlug = generateUniqueSlug(this.title);
  let slug = baseSlug;
  let slugExists = await CourseContent.findOne({ slug });

  // If the slug already exists, append a number to make it unique
  let counter = 1;
  while (slugExists) {
    slug = `${baseSlug}-${counter}`;
    slugExists = await CourseContent.findOne({ slug });
    counter++;
  }
  this.slug = slug;
  return slug;
};
// Create a model from the schema
const CourseContent = mongoose.model<ICourseContent>(
  "CourseContent",
  courseContentSchema
);

export default CourseContent;
