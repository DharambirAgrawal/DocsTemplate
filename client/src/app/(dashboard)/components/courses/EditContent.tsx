"use client";
import { useState } from "react";

interface EditProp {
  setShowEditSectionModal: (show: boolean) => void;
}

const EditContent = ({ setShowEditSectionModal }: EditProp) => {
  // State for the section being edited
  const [editSection, setEditSection] = useState({
    sectionTitle: "",
    sectionContent: "",
    slug: "",
    order: 1,
    metadata: {
      sectionMetaTitle: "",
      sectionMetaDesc: "",
    },
  });

  const [currentKeyword, setCurrentKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleEditSectionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditSection((prev) => {
      if (name.includes("metadata")) {
        return {
          ...prev,
          metadata: {
            ...prev.metadata,
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

  const handleUpdateSection = () => {
    // Here you would call your API or update logic to save the changes
    console.log("Updated section: ", editSection);
    // Close the modal after update
    setShowEditSectionModal(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentKeyword.trim() !== "") {
      addKeyword();
    }
  };

  const addKeyword = () => {
    if (currentKeyword.trim() !== "") {
      setKeywords((prevKeywords) => [...prevKeywords, currentKeyword.trim()]);
      setCurrentKeyword(""); // Clear input field
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Section</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Section Title *
          </label>
          <input
            type="text"
            name="sectionTitle"
            value={editSection.sectionTitle}
            onChange={handleEditSectionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter section title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Section Content *
          </label>
          <textarea
            name="sectionContent"
            value={editSection.sectionContent}
            onChange={handleEditSectionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            placeholder="Enter section content"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Slug
          </label>
          <input
            type="text"
            name="slug"
            value={editSection.slug}
            onChange={handleEditSectionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="section-slug"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Order
          </label>
          <input
            type="number"
            name="order"
            value={editSection.order}
            onChange={handleEditSectionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="1"
          />
        </div>

        <h3 className="text-lg font-semibold mb-2 mt-4">SEO Metadata</h3>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Meta Title
          </label>
          <input
            type="text"
            name="metadata.sectionMetaTitle"
            value={editSection.metadata.sectionMetaTitle}
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
            name="metadata.sectionMetaDesc"
            value={editSection.metadata.sectionMetaDesc}
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
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Added Keywords: {keywords.join(", ")}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setShowEditSectionModal(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateSection}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Section
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContent;
