"use client";
import { useState } from "react";
// import { updatePost } from "../../dashboard/posts/actions";
import { showToast } from "@/features/ToastNotification/useToast";
import { PostType } from "./types";

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
  const [editedPost, setEditedPost] = useState<PostType>(post);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Special handler for datetime input because it requires ISO formatting
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEditedPost((prev) => ({
      ...prev,
      publishedAt: new Date(value).toISOString(),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const res = await updatePost(editedPost, post.slug);
    const res = { success: true, message: "Post updated successfully" };
    if (res.success) {
      showToast("success", res.message || "Post updated successfully");
    } else {
      showToast("error", res.error?.message || "Something went wrong");
    }
    setRefresh((prev) => !prev);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedPost.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Summary */}
          <div>
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              value={editedPost.summary}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={editedPost.imageUrl}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Published Date */}
          <div>
            <label
              htmlFor="publishedAt"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Published Date
            </label>
            <input
              type="datetime-local"
              id="publishedAt"
              name="publishedAt"
              value={
                new Date(editedPost.publishedAt).toISOString().substring(0, 16)
              }
              onChange={handleDateChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Additional fields like categories, tags, meta data can be added here */}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostDialog;
