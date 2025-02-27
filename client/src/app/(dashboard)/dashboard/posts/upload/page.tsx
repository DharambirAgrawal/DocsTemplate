"use client";

import { useState, useEffect, type FormEvent } from "react";
import ImageGrid from "@/app/(dashboard)/components/Images/ImageGrid";
import Image from "next/image";
import { publishPost, getCategories } from "../actions";
import { getImagesAction } from "../../images/actions";
import { showToast } from "@/features/ToastNotification/useToast";

const initialCategories: Category[] = [];
export interface Category {
  slug?: string;
  name: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  timeRead: number;
  categories: string[];
  tags: string[];
  content: string;
  metaTitle: string;
  metaDesc: string;
  metaKeywords: string;
  metaImage: string;
  status: "draft" | "published";
}

export interface FormData extends Omit<BlogPost, "id" | "status"> {}

const initialData: FormData = {
  title: "",
  summary: "",
  imageUrl: "",
  timeRead: 5,
  categories: [],
  tags: [],
  content: "",
  metaTitle: "",
  metaDesc: "",
  metaKeywords: "",
  metaImage: "",
};

export default function CreatePost() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (categoryName: string) => {
    setFormData((prev) => {
      const updatedCategories = prev.categories.includes(categoryName)
        ? prev.categories.filter((cat) => cat !== categoryName)
        : [...prev.categories, categoryName];
      return { ...prev, categories: updatedCategories };
    });
  };

  const addNewCategory = () => {
    if (newCategory && !categories.find((cat) => cat.name === newCategory)) {
      const newCat: Category = {
        slug: `new-${Date.now()}`,
        name: newCategory,
      };
      setCategories((prev) => [...prev, newCat]);
      handleCategoryToggle(newCategory);
      setNewCategory("");
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({ ...prev, tags }));
  };

  const removeCategory = (categoryName: string) => {
    handleCategoryToggle(categoryName);
  };

  const handleSubmit = async (e: FormEvent, status: "draft" | "published") => {
    e.preventDefault();
    setLoading(true);
    const submitData = {
      ...formData,
      status,
    };
    const res = await publishPost(submitData);

    if (res.success) {
      showToast("success", res.message || "Success");
    } else {
      showToast("error", res.error?.message || "Something went wrong");
    }
    setFormData(initialData);
    setLoading(false);
  };

  const handleImageSelect = (image: any) => {
    setFormData((prev) => ({ ...prev, imageUrl: image.url }));
    setIsModalOpen(false); // Close the modal after selecting
  };

  useEffect(() => {
    if (formData.imageUrl) {
      setPreviewImage(formData.imageUrl);
    }
  }, [formData.imageUrl]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories({ limit: 0 });
      const images = await getImagesAction("BLOG");
      if (images.success) {
        setImages(images.data);
      }
      if (categories.success) {
        setCategories(categories.data);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-semibold text-gray-900">
              Create New Post
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the details below to create a new blog post
            </p>
          </div>

          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab("write")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "write"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Write
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "preview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Preview
            </button>
          </div>

          <div className="p-6">
            {activeTab === "write" ? (
              <form
                onSubmit={(e) => handleSubmit(e, "published")}
                className="l"
              >
                <div className="space-y-6">
                  {/* Title  */}
                  <div className=" gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Enter post title"
                        required
                      />
                    </div>
                  </div>
                  {/* Summary */}
                  <div className="space-y-2">
                    <label
                      htmlFor="metaDescription"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Summary
                    </label>
                    <textarea
                      id="summary"
                      name="summary"
                      rows={3}
                      value={formData.summary}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="SEO description"
                    ></textarea>
                  </div>

                  {/* Image & Time to Read */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <label
                        htmlFor="imageUrl"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Featured Image URL
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="imageUrl"
                          name="imageUrl"
                          value={formData.imageUrl || ""}
                          readOnly
                          onClick={() => setIsModalOpen(true)} // Open modal on click
                          className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer"
                          placeholder="Click to select image"
                        />
                      </div>

                      {/* Modal to select image */}
                      {isModalOpen && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-[100]">
                          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
                            <button
                              className="absolute top-2 right-2 text-gray-600"
                              onClick={() => setIsModalOpen(false)}
                            >
                              X
                            </button>
                            <h2 className="text-xl font-semibold mb-4">
                              Select an Image
                            </h2>
                            <ImageGrid
                              images={images}
                              handleImageClick={handleImageSelect} // Pass the selection handler
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="timeToRead"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Time to Read (minutes)
                      </label>
                      <input
                        type="number"
                        id="timeRead"
                        name="timeRead"
                        value={formData.timeRead}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Categories
                    </label>
                    <div className="min-h-[3rem] p-2 rounded-lg border border-gray-200 bg-gray-50">
                      {formData.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {formData.categories.map((category) => (
                            <span
                              key={category}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
                            >
                              {category}
                              <button
                                type="button"
                                onClick={() => removeCategory(category)}
                                className="ml-2 hover:text-blue-900"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-gray-200">
                      <div className="p-4 border-t border-gray-200">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Add new category"
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={addNewCategory}
                            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      {categories.map((category) => (
                        <label
                          key={category.slug}
                          className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.categories.includes(
                              category.name
                            )}
                            onChange={() => handleCategoryToggle(category.name)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm text-gray-700">
                            {category.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags.join(", ")}
                      onChange={handleTagsChange}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="technology, programming, web"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Content
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      rows={12}
                      value={formData.content}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Write your post content here..."
                      required
                    ></textarea>
                  </div>

                  {/* Meta Information */}
                  <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900">
                      SEO Meta Information
                    </h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="metaTitle"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Meta Title
                        </label>
                        <input
                          type="text"
                          id="metaTitle"
                          name="metaTitle"
                          value={formData.metaTitle}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="SEO title"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="metaKeywords"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Meta Keywords
                        </label>
                        <input
                          type="text"
                          id="metaKeywords"
                          name="metaKeywords"
                          value={formData.metaKeywords}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="keyword1, keyword2, keyword3"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="metaDescription"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Meta Description
                      </label>
                      <textarea
                        id="metaDesc"
                        name="metaDesc"
                        rows={3}
                        value={formData.metaDesc}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="SEO description"
                      ></textarea>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={(e) => handleSubmit(e, "draft")}
                      className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save as Draft"}
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      disabled={loading}
                    >
                      {loading ? "Publishing..." : "Publish"}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                {/* Preview Header */}
                <div className="space-y-4">
                  {previewImage && (
                    <div className="relative h-96 rounded-xl overflow-hidden">
                      <Image
                        src={previewImage || "/placeholder.svg"}
                        alt={formData.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h1 className="text-4xl font-bold text-gray-900">
                    {formData.title || "Untitled Post"}
                  </h1>
                  <p className="text-xl text-gray-600">
                    {formData.summary || "No summary provided"}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{formData.timeRead} min read</span>
                    <span>•</span>
                    <div className="flex flex-wrap gap-2">
                      {formData.categories.map((category) => (
                        <span
                          key={category}
                          className="px-3 py-1 rounded-full bg-blue-50 text-blue-700"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Preview Content */}
                <div className="prose prose-lg max-w-none">
                  {formData.content || "No content provided"}
                </div>

                {/* Preview Meta */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    SEO Preview
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl text-blue-600 hover:underline">
                        {formData.metaTitle || formData.title}
                      </h4>
                      <div className="text-sm text-green-700">
                        {window.location.origin}/blog/
                        {formData.title.toLowerCase().replace(/ /g, "-")}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {formData.metaDesc || formData.summary}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
