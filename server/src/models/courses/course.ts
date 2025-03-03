import mongoose, { Document, Schema } from "mongoose";
import { generateUniqueSlug } from "../../api/courses/course.helper";
export enum CourseStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}
interface IContentGroup {
  title: string;
  order: number;
  sections: mongoose.Types.ObjectId[];
}
export interface ICourse extends Document {
  title: string;
  description: string;
  duration: string; // E.g., '2 hours', '5 weeks', etc.
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  category: string; // E.g., 'Web Development', 'Frontend', etc.
  slug: string; // Slug for SEO-friendly URL
  saveSlug: () => Promise<string>;
  authorId: mongoose.Types.ObjectId[];
  contentGroups: IContentGroup[];
  status: CourseStatus;
  createdAt: Date;
  updatedAt: Date;
  metaData: {
    tags: string[]; // Tags for better categorization and search
    views: number; // View count for the course
    seoTitle: string; // Custom SEO title for the page
    seoDescription: string; // Custom SEO description for the page
    seoKeywords: string[]; // Custom SEO keywords
  };
}

// Mongoose Schema for Content Group
const ContentGroupSchema = new Schema<IContentGroup>({
  title: {
    type: String,
    required: [true, "Group title is required"],
    trim: true,
  },
  order: {
    type: Number,
    required: true,
    min: [0, "Order must be a positive number"],
  },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "CourseContent" }],
});

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
    authorId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
    status: {
      type: String,
      enum: Object.values(CourseStatus),
      default: CourseStatus.DRAFT,
    },
    contentGroups: [ContentGroupSchema],
    metaData: {
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
    timestamps: true,
  }
);

courseSchema.methods.saveSlug = async function () {
  const baseSlug = generateUniqueSlug(this.title);
  let slug = baseSlug;
  let slugExists = await Course.findOne({ slug });

  // If the slug already exists, append a number to make it unique
  let counter = 1;
  while (slugExists) {
    slug = `${baseSlug}-${counter}`;
    slugExists = await Course.findOne({ slug });
    counter++;
  }
  this.slug = slug;
  return slug;
};

// Custom validation for ensuring groups are ordered correctly
// Custom validation for ensuring groups are ordered correctly
// courseSchema.pre("validate", function (next) {
//   // Check if contentGroups have unique order values and are not null/undefined
//   if (this.contentGroups && this.contentGroups.length > 0) {
//     const groupOrders = this.contentGroups.map((group) => {
//       if (!group || !group.order) {
//         throw new Error("Each content group must have a valid order value");
//       }
//       return group.order;
//     });
//     const uniqueGroupOrders = new Set(groupOrders);

//     if (groupOrders.length !== uniqueGroupOrders.size) {
//       return next(new Error("Content groups must have unique order values"));
//     }

//     // Check if sections within each group have unique order values and are not null/undefined
//     for (const group of this.contentGroups) {
//       if (!group.sections || group.sections.length === 0) continue; // Skip if no sections

//       const sectionOrders = group.sections.map((section) => {
//         if (!section || section.order === undefined) {
//           throw new Error(
//             `Each section in group "${group.title}" must have a valid order value`
//           );
//         }
//         return section.order;
//       });

//       const uniqueSectionOrders = new Set(sectionOrders);

//       if (sectionOrders.length !== uniqueSectionOrders.size) {
//         return next(
//           new Error(
//             `Sections in group "${group.title}" must have unique order values`
//           )
//         );
//       }
//     }
//   } else {
//     return next(new Error("Course must have at least one content group"));
//   }

//   next();
// });

// Create a model from the schema
const Course = mongoose.model<ICourse>("Course", courseSchema);

export default Course;
