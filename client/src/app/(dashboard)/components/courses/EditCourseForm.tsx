"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { updateCourseAction } from "../../dashboard/course/actions";
import { title } from "process";
import { showToast } from "@/features/ToastNotification/useToast";

interface Metadata {
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  views?: number;
}

interface FormData {
  title: string;
  description: string;
  duration: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  category: string;
  slug: string;
  metaData: Metadata;
}

interface AddCourseFormProps {
  onCancel: () => void;
  course: FormData;
}

const AddCourseForm = ({ onCancel, course }: AddCourseFormProps) => {
  const [formData, setFormData] = useState<FormData>(
    course || {
      title: "",
      description: "",
      duration: "",
      level: "BEGINNER",
      category: "",
      metaData: {
        tags: [],
        seoTitle: "",
        seoDescription: "",
        seoKeywords: [],
      },
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentTag, setCurrentTag] = useState<string>("");
  const [currentKeyword, setCurrentKeyword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle form input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      // Handle nested objects like metaData.seoTitle
      const [parent, child] = name.split(".");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [parent]: {
          ...(prevFormData[parent as keyof FormData] as any),
          [child]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // Add a tag to the list
  const addTag = () => {
    if (
      currentTag.trim() &&
      !formData.metaData.tags.includes(currentTag.trim())
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        metaData: {
          ...prevFormData.metaData,
          tags: [...prevFormData.metaData.tags, currentTag.trim()],
        },
      }));
      setCurrentTag("");
    }
  };

  // Remove a tag from the list
  const removeTag = (tagToRemove: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      metaData: {
        ...prevFormData.metaData,
        tags: prevFormData.metaData.tags.filter((tag) => tag !== tagToRemove),
      },
    }));
  };

  // Add a keyword to the list
  const addKeyword = () => {
    if (
      currentKeyword.trim() &&
      !formData.metaData.seoKeywords.includes(currentKeyword.trim())
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        metaData: {
          ...prevFormData.metaData,
          seoKeywords: [
            ...prevFormData.metaData.seoKeywords,
            currentKeyword.trim(),
          ],
        },
      }));
      setCurrentKeyword("");
    }
  };

  // Remove a keyword from the list
  const removeKeyword = (keywordToRemove: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      metaData: {
        ...prevFormData.metaData,
        seoKeywords: prevFormData.metaData.seoKeywords.filter(
          (keyword) => keyword !== keywordToRemove
        ),
      },
    }));
  };

  // Handle key presses for tags and keywords
  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: "tag" | "keyword"
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (type === "tag") {
        addTag();
      } else if (type === "keyword") {
        addKeyword();
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent, status: string) => {
    e.preventDefault();
    setLoading(true);
    // Create the complete course object
    const courseData = {
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      level: formData.level,
      category: formData.category,
      status: status,
      slug: formData.slug,
      ...formData.metaData,
    };
    const res = await updateCourseAction(courseData);
    if (!res.success) {
      showToast("error", res.error?.message || "Something went wrong");
      setLoading(false);
      return;
    }
    showToast("success", res.message || "Course Updated successfully");
    setLoading(false);
    onCancel();
  };

  return (
    <form className="space-y-6" onSubmit={(e) => handleSubmit(e, "publish")}>
      {/* Basic Information */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Basic Information
        </h4>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration (e.g., "4 weeks", "2 hours")
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.duration ? "border-red-500" : "border-gray-300"
                } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="level"
                className="block text-sm font-medium text-gray-700"
              >
                Level
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.category ? "border-red-500" : "border-gray-300"
              } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
              placeholder="e.g., Web Development, Frontend, etc."
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Tags</h4>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.metaData.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1.5 text-blue-600 hover:text-blue-800"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, "tag")}
            placeholder="Add a tag and press Enter"
            className="flex-grow rounded-l-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={addTag}
            className="rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Add
          </button>
        </div>
      </div>

      {/* SEO Information */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          SEO Information
        </h4>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="metaData.seoTitle"
              className="block text-sm font-medium text-gray-700"
            >
              SEO Title
            </label>
            <input
              type="text"
              id="metaData.seoTitle"
              name="metaData.seoTitle"
              value={formData.metaData.seoTitle}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors["metaData.seoTitle"]
                  ? "border-red-500"
                  : "border-gray-300"
              } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
            />
            {errors["metaData.seoTitle"] && (
              <p className="mt-1 text-sm text-red-600">
                {errors["metaData.seoTitle"]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="metaData.seoDescription"
              className="block text-sm font-medium text-gray-700"
            >
              SEO Description
            </label>
            <textarea
              id="metaData.seoDescription"
              name="metaData.seoDescription"
              rows={2}
              value={formData.metaData.seoDescription}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors["metaData.seoDescription"]
                  ? "border-red-500"
                  : "border-gray-300"
              } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
            />
            {errors["metaData.seoDescription"] && (
              <p className="mt-1 text-sm text-red-600">
                {errors["metaData.seoDescription"]}
              </p>
            )}
          </div>

          {/* SEO Keywords */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SEO Keywords
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.metaData.seoKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => removeKeyword(keyword)}
                    className="ml-1.5 text-green-600 hover:text-green-800"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={currentKeyword}
                onChange={(e) => setCurrentKeyword(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, "keyword")}
                placeholder="Add a keyword and press Enter"
                className="flex-grow rounded-l-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={addKeyword}
                className="rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="pt-2 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          onClick={(e) => handleSubmit(e, "publish")}
          className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default AddCourseForm;
