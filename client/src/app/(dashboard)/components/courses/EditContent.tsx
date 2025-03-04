"use client";
import { useState } from "react";
import { updateCourseContentAction } from "../../dashboard/course/actions";
import { showToast } from "@/features/ToastNotification/useToast";
interface CourseSectionType {
  _id: string;
  slug: string;
  title: string;
  content: string;
  order: number;
  metaData: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
  };
}

interface EditProp {
  setShowEditSectionModal: (show: boolean) => void;
  editContent: CourseSectionType;
  refreshCourseData: () => void;
}

const EditContent = ({
  setShowEditSectionModal,
  editContent,
  refreshCourseData,
}: EditProp) => {
  // State for the section being edited
  const [editSection, setEditSection] =
    useState<CourseSectionType>(editContent);
  const [loading, setLoading] = useState(false);

  const [currentKeyword, setCurrentKeyword] = useState("");

  const handleEditSectionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditSection((prev) => {
      if (name.includes("metaData")) {
        return {
          ...prev,
          metaData: {
            ...prev.metaData,
            [name.split(".")[1]]: value,
          },
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const handleUpdateContent = async (id: string) => {
    setLoading(true);
    const res = await updateCourseContentAction(editSection, id);
    if (res.success) {
      showToast("success", res.message || "Content Updated successfully");
      refreshCourseData();
    } else {
      showToast("error", res.error?.message || "Something went wrong");
    }
    // Close the modal after update
    setShowEditSectionModal(false);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentKeyword.trim() !== "") {
      addKeyword();
    }
  };

  const addKeyword = () => {
    if (currentKeyword.trim() !== "") {
      setEditSection((prev) => {
        const updatedMetaKeywords = [
          ...prev.metaData.metaKeywords,
          currentKeyword.trim(),
        ];
        return {
          ...prev,
          metaData: {
            ...prev.metaData,
            metaKeywords: updatedMetaKeywords,
          },
        };
      });
      setCurrentKeyword(""); // Clear input field
    }
  };

  const removeKeyword = (keyword: string) => {
    setEditSection((prev) => {
      const updatedMetaKeywords = prev.metaData.metaKeywords.filter(
        (kw) => kw !== keyword
      );
      return {
        ...prev,
        metaData: {
          ...prev.metaData,
          metaKeywords: updatedMetaKeywords,
        },
      };
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Section</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Section Title *
          </label>
          <input
            type="text"
            name="title"
            value={editSection.title}
            onChange={handleEditSectionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter content title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Section Content *
          </label>
          <textarea
            name="content"
            value={editSection.content}
            onChange={handleEditSectionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            placeholder="Enter content"
            required
          ></textarea>
        </div>

        <h3 className="text-lg font-semibold mb-2 mt-4">SEO Metadata</h3>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Meta Title
          </label>
          <input
            type="text"
            name="metaData.metaTitle"
            value={editSection.metaData.metaTitle}
            onChange={handleEditSectionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter meta title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Meta Description
          </label>
          <textarea
            name="metaData.metaDescription"
            value={editSection.metaData.metaDescription}
            onChange={handleEditSectionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
            placeholder="Enter meta description"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Meta Keywords (comma-separated)
          </label>
          <div className="flex items-center">
            <input
              type="text"
              value={currentKeyword}
              onChange={(e) => setCurrentKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a keyword and press Enter"
              className="w-full py-2 px-3 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={addKeyword}
              className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-700 focus:outline-none"
            >
              Add
            </button>
          </div>
        </div>

        {/* Keywords List */}
        <div className="flex flex-wrap mt-2">
          {editSection.metaData.metaKeywords.map((keyword, index) => (
            <span
              key={index}
              className="bg-blue-200 text-blue-800 text-sm py-1 px-2 rounded-full mr-2 mb-2"
            >
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(keyword)}
                className="ml-2 text-red-500"
              >
                &times;
              </button>
            </span>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => setShowEditSectionModal(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={() => handleUpdateContent(editSection._id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? "Updating..." : "Update Section"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContent;
