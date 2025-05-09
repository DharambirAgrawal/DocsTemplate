"use client";
import { useState, useEffect, type FormEvent } from "react";
import ImageGrid from "../Images/ImageGrid";
import { showToast } from "@/features/ToastNotification/useToast";
import { PostType } from "./types";
import { getImagesAction } from "../../dashboard/images/actions";
import { getCategories } from "@/app/(blog)/components/actions";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";
interface EditPostDialogProps {
  post: PostType;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const EditPostDialog: React.FC<EditPostDialogProps> = ({
  post,
  setRefresh,
  onClose,
}) => {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const imagesPerPage = 10;

  const [formData, setFormData] = useState({
    ...post,
    tags: post.tags.map((tag) => tag.name),
  });
  const [categories, setCategories] = useState(post.categories);
  const [newCategory, setNewCategory] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({
    currentPage: currentPage,
    totalItems: imagesPerPage,
    totalPages: 1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "published") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "true" ? true : false,
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (categoryName: string) => {
    setFormData((prev) => {
      const updatedCategories = prev.categories.some(
        (cat) => cat.name === categoryName
      )
        ? prev.categories.filter((cat) => cat.name !== categoryName)
        : [
            ...prev.categories,
            { name: categoryName, slug: `new-${Date.now()}` },
          ];
      return { ...prev, categories: updatedCategories };
    });
  };

  const addNewCategory = () => {
    if (newCategory && categories.find((cat) => cat.name === newCategory)) {
      const newCat = {
        name: newCategory,
        slug: `new-${Date.now()}`,
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

  const removeCategory = (categorySlug: string) => {
    setFormData((prev) => {
      const updatedCategories = prev.categories.filter(
        (category) => category.slug !== categorySlug
      );
      return { ...prev, categories: updatedCategories };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(() => true);
    // const submitData = {
    //   ...formData,
    //   status,
    // };
    const res = {
      success: true,
      message: "Post updated successfully",
    };
    if (res.success) {
      showToast("success", res.message || "Success");
    } else {
      // showToast("error", res.error?.message || "Something went wrong");
    }

    setLoading(false);
    onClose();
  };

  const handleImageSelect = (image: any) => {
    setFormData((prev) => ({ ...prev, imageUrl: image.url }));
    setIsModalOpen(false); // Close the modal after selecting
  };

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const categories = await getCategories({ limit: 0 });
  //     const images = await getImagesAction({
  //       folder: "BLOG",
  //       limit: imagesPerPage,
  //       page: currentPage,
  //     });

  //     if (images.success) {
  //       setPagination(images.pagination);
  //       setImages(images.data);
  //     }
  //     if (categories.success) {
  //       setCategories(categories.data);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  useEffect(() => {
    const fetchImages = async () => {
      if (isModalOpen) {
        const images = await getImagesAction({
          folder: "BLOG",
          limit: imagesPerPage,
          page: currentPage,
        });

        if (images.success) {
          setPagination(images.pagination);
          setImages(images.data);
        }
      }
    };

    fetchImages();
  }, [currentPage, isModalOpen]);
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories({ limit: 0 });

      if (categories.success) {
        setCategories(categories.data);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Post</h2>
        <form className="space-y-4 max-h-[80vh] overflow-y-auto">
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

            <div>
              <label
                htmlFor="published"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Published
              </label>
              <select
                id="published"
                name="published"
                value={formData.published ? "true" : "false"}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
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
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 bg-gray-100 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      <Pagination
                        currentPage={currentPage}
                        totalPages={pagination?.totalPages || 1}
                        // res.pagination?.totalPages
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
                        key={category.slug}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
                      >
                        {category.name}
                        <button
                          type="button"
                          onClick={() => removeCategory(category.slug)}
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
                      checked={formData.categories.some(
                        (cat) => cat.name === category.name
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
                    value={formData.metaData.metaTitle}
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
                    value={formData.metaData.metaKeywords}
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
                  value={formData.metaData.metaDesc}
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
                onClick={() => onClose()}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostDialog;
