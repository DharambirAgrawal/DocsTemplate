// "use client";
// import { useState } from "react";
// import { publishCourseContentAction } from "../../dashboard/course/actions";
// import { showToast } from "@/features/ToastNotification/useToast";
// interface CourseSectionType {
//   title: string;
//   content: string;
//   order?: number;
//   metaData: {
//     metaTitle: string;
//     metaDescription: string;
//     metaKeywords: string[];
//   };
// }

// interface AddContentProp {
//   setShowAddSectionModal: (show: boolean) => void;
//   groupContent: {
//     _id: string;
//     title: string;
//     order: number;
//     sections: CourseSectionType[];
//   };
//   slug: string;
// }

// const AddContent = ({
//   setShowAddSectionModal,
//   groupContent,
//   slug,
// }: AddContentProp) => {
//   const [newSection, setNewSection] = useState<CourseSectionType>({
//     title: "",
//     content: "",
//     metaData: {
//       metaTitle: "",
//       metaDescription: "",
//       metaKeywords: [],
//     },
//   });
//   const [currentKeyword, setCurrentKeyword] = useState("");

//   const handleAddSection = async () => {
//     const id = groupContent._id;
//     const formData = {
//       ...newSection,
//       id: id,
//       slug: slug,
//     };
//     const res = await publishCourseContentAction(formData, "content");
//     if (res.success) {
//       showToast("success", res.message || "Content Added successfully");
//     } else {
//       showToast("error", res.error?.message || "Something went wrong");
//     }
//     setShowAddSectionModal(false); // Close modal after adding
//   };

//   const handleKeyPress = (e: React.KeyboardEvent, field: string) => {
//     if (e.key === "Enter" && currentKeyword.trim()) {
//       addKeyword();
//     }
//   };

//   const addKeyword = () => {
//     if (
//       currentKeyword.trim() &&
//       !newSection.metaData.metaKeywords.includes(currentKeyword.trim())
//     ) {
//       setNewSection((prevState) => ({
//         ...prevState,
//         metaData: {
//           ...prevState.metaData,
//           metaKeywords: [
//             ...prevState.metaData.metaKeywords,
//             currentKeyword.trim(),
//           ],
//         },
//       }));
//       setCurrentKeyword(""); // Clear input after adding the keyword
//     }
//   };

//   const removeKeyword = (keyword: string) => {
//     setNewSection((prevState) => ({
//       ...prevState,
//       metaData: {
//         ...prevState.metaData,
//         metaKeywords: prevState.metaData.metaKeywords.filter(
//           (k) => k !== keyword
//         ),
//       },
//     }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
//       <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-screen overflow-y-auto shadow-xl">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">
//           Add New Section
//         </h2>

//         {/* Section Title */}
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-medium mb-2">
//             Section Title *
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={newSection.title}
//             onChange={(e) =>
//               setNewSection({ ...newSection, title: e.target.value })
//             }
//             className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Enter section title"
//             required
//           />
//         </div>

//         {/* Section Content */}
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-medium mb-2">
//             Section Content *
//           </label>
//           <textarea
//             name="content"
//             value={newSection.content}
//             onChange={(e) =>
//               setNewSection({ ...newSection, content: e.target.value })
//             }
//             className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-32"
//             placeholder="Enter section content"
//             required
//           ></textarea>
//         </div>

//         {/* SEO Metadata */}
//         <h3 className="text-xl font-semibold mb-4">SEO Metadata</h3>

//         {/* Meta Title */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-medium mb-2">
//             Meta Title
//           </label>
//           <input
//             type="text"
//             name="metaData.metaTitle"
//             value={newSection.metaData.metaTitle}
//             onChange={(e) =>
//               setNewSection({
//                 ...newSection,
//                 metaData: { ...newSection.metaData, metaTitle: e.target.value },
//               })
//             }
//             className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Enter meta title"
//           />
//         </div>

//         {/* Meta Description */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-medium mb-2">
//             Meta Description
//           </label>
//           <textarea
//             name="metaData.metaDescription"
//             value={newSection.metaData.metaDescription}
//             onChange={(e) =>
//               setNewSection({
//                 ...newSection,
//                 metaData: {
//                   ...newSection.metaData,
//                   metaDescription: e.target.value,
//                 },
//               })
//             }
//             className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-20"
//             placeholder="Enter meta description"
//           ></textarea>
//         </div>

//         {/* Meta Keywords */}
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-medium mb-2">
//             Meta Keywords (comma-separated)
//           </label>
//           <div className="flex items-center">
//             <input
//               type="text"
//               value={currentKeyword}
//               onChange={(e) => setCurrentKeyword(e.target.value)}
//               onKeyPress={(e) => handleKeyPress(e, "keyword")}
//               placeholder="Add a keyword and press Enter"
//               className="w-full py-2 px-3 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
//             />
//             <button
//               type="button"
//               onClick={addKeyword}
//               className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-700 focus:outline-none"
//             >
//               Add
//             </button>
//           </div>
//         </div>

//         {/* Keywords List */}
//         <div className="flex flex-wrap mt-2">
//           {newSection.metaData.metaKeywords.map((keyword, index) => (
//             <span
//               key={index}
//               className="bg-blue-200 text-blue-800 text-sm py-1 px-2 rounded-full mr-2 mb-2"
//             >
//               {keyword}
//               <button
//                 type="button"
//                 onClick={() => removeKeyword(keyword)}
//                 className="ml-2 text-red-500"
//               >
//                 &times;
//               </button>
//             </span>
//           ))}
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end mt-6">
//           <button
//             onClick={() => setShowAddSectionModal(false)}
//             className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-md mr-4"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleAddSection}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md"
//             disabled={!newSection.title.trim() || !newSection.content.trim()}
//           >
//             Add Section
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddContent;

"use client";
import { useState } from "react";
import { publishCourseContentAction } from "../../dashboard/course/actions";
import { showToast } from "@/features/ToastNotification/useToast";
import Preview from "@/features/CompileMdx/Preview";
import CompilePreviewMDX from "@/features/CompileMdx/MDXClientCompile";

interface CourseSectionType {
  title: string;
  content: string;
  order?: number;
  metaData: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
  };
}

interface AddContentProp {
  setShowAddSectionModal: (show: boolean) => void;
  groupContent: {
    _id: string;
    title: string;
    order: number;
    sections: CourseSectionType[];
  };
  slug: string;
}

const AddContent = ({
  setShowAddSectionModal,
  groupContent,
  slug,
}: AddContentProp) => {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isLoading, setIsLoading] = useState(false);
  const [newSection, setNewSection] = useState<CourseSectionType>({
    title: "",
    content: "",
    metaData: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: [],
    },
  });
  const [currentKeyword, setCurrentKeyword] = useState("");

  const handleAddSection = async () => {
    const id = groupContent._id;
    setIsLoading(true);
    const formData = {
      ...newSection,
      id: id,
      slug: slug,
    };
    const res = await publishCourseContentAction(formData, "content");
    if (res.success) {
      showToast("success", res.message || "Content Added successfully");
    } else {
      showToast("error", res.error?.message || "Something went wrong");
    }
    setShowAddSectionModal(false); // Close modal after adding
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent, field: string) => {
    if (e.key === "Enter" && currentKeyword.trim()) {
      addKeyword();
    }
  };

  const addKeyword = () => {
    if (
      currentKeyword.trim() &&
      !newSection.metaData.metaKeywords.includes(currentKeyword.trim())
    ) {
      setNewSection((prevState) => ({
        ...prevState,
        metaData: {
          ...prevState.metaData,
          metaKeywords: [
            ...prevState.metaData.metaKeywords,
            currentKeyword.trim(),
          ],
        },
      }));
      setCurrentKeyword(""); // Clear input after adding the keyword
    }
  };

  const removeKeyword = (keyword: string) => {
    setNewSection((prevState) => ({
      ...prevState,
      metaData: {
        ...prevState.metaData,
        metaKeywords: prevState.metaData.metaKeywords.filter(
          (k) => k !== keyword
        ),
      },
    }));
  };

  const renderTabContent = () => {
    if (activeTab === "edit") {
      return (
        <>
          {/* Section Title */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Section Title *
            </label>
            <input
              type="text"
              name="title"
              value={newSection.title}
              onChange={(e) =>
                setNewSection({ ...newSection, title: e.target.value })
              }
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter section title"
              required
            />
          </div>

          {/* Section Content */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Section Content *
            </label>
            <textarea
              name="content"
              value={newSection.content}
              onChange={(e) =>
                setNewSection({ ...newSection, content: e.target.value })
              }
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-32"
              placeholder="Enter section content"
              required
            ></textarea>
          </div>

          {/* SEO Metadata */}
          <h3 className="text-xl font-semibold mb-4">SEO Metadata</h3>

          {/* Meta Title */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Meta Title
            </label>
            <input
              type="text"
              name="metaData.metaTitle"
              value={newSection.metaData.metaTitle}
              onChange={(e) =>
                setNewSection({
                  ...newSection,
                  metaData: {
                    ...newSection.metaData,
                    metaTitle: e.target.value,
                  },
                })
              }
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter meta title"
            />
          </div>

          {/* Meta Description */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Meta Description
            </label>
            <textarea
              name="metaData.metaDescription"
              value={newSection.metaData.metaDescription}
              onChange={(e) =>
                setNewSection({
                  ...newSection,
                  metaData: {
                    ...newSection.metaData,
                    metaDescription: e.target.value,
                  },
                })
              }
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-20"
              placeholder="Enter meta description"
            ></textarea>
          </div>

          {/* Meta Keywords */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Meta Keywords (comma-separated)
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={currentKeyword}
                onChange={(e) => setCurrentKeyword(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, "keyword")}
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
            {newSection.metaData.metaKeywords.map((keyword, index) => (
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
        </>
      );
    } else {
      return (
        <div className="preview-container bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {newSection.title || "Section Title Preview"}
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm min-h-32">
              <Preview>
                <CompilePreviewMDX content={newSection.content} />
              </Preview>
            </div>
          </div>

          <div className="seo-preview mt-8 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              SEO Preview
            </h3>
            <div className="border-t border-gray-200 pt-3">
              <p className="text-blue-600 text-lg font-medium mb-1">
                {newSection.metaData.metaTitle || "Meta Title Preview"}
              </p>

              <p className="text-gray-600 text-sm">
                {newSection.metaData.metaDescription ||
                  "Meta description will appear here..."}
              </p>
              <div className="mt-3">
                {newSection.metaData.metaKeywords.length > 0 ? (
                  <div className="flex flex-wrap">
                    <span className="text-sm text-gray-500 mr-2">
                      Keywords:
                    </span>
                    {newSection.metaData.metaKeywords.map((keyword, index) => (
                      <span key={index} className="text-sm text-gray-500 mr-1">
                        {keyword}
                        {index < newSection.metaData.metaKeywords.length - 1
                          ? ","
                          : ""}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No keywords added</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-screen overflow-y-auto shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add New Section
        </h2>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === "edit"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("edit")}
          >
            Edit Content
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === "preview"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
        </div>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Actions */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setShowAddSectionModal(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-md mr-4"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleAddSection}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md"
            disabled={
              !newSection.title.trim() ||
              !newSection.content.trim() ||
              isLoading
            }
          >
            {isLoading ? "Adding..." : "  Add Section "} {/* Loading state */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContent;
