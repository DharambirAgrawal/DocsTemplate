"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CourseContentPage = () => {
  const router = useRouter();
  const courseId = "123";

  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [newGroup, setNewGroup] = useState("");
  const [currentGroup, setCurrentGroup] = useState("");
  const [newSection, setNewSection] = useState({
    sectionTitle: "",
    sectionContent: "",
    slug: "",
    order: 0,
    metadata: {
      sectionMetaTitle: "",
      sectionMetaDesc: "",
      sectionMetaKeywords: [],
    },
  });
  const [editSection, setEditSection] = useState(null);
  const [showEditSectionModal, setShowEditSectionModal] = useState(false);

  // Mock data loading - in a real application, you would fetch this from an API
  useEffect(() => {
    // Simulating API call delay
    if (courseId) {
      setTimeout(() => {
        // Mock course data
        const mockCourse = {
          _id: courseId,
          title: "Introduction to React",
          description: "Learn the basics of React framework",
          level: "BEGINNER",
          category: "Frontend",
          duration: "4 weeks",
          metadata: {
            views: 1200,
            tags: ["react", "javascript", "frontend"],
          },
          content: [
            {
              _id: "101",
              sectionTitle: "Getting Started with React",
              sectionContent:
                "React is a JavaScript library for building user interfaces...",
              slug: "getting-started-with-react",
              group: "Basics",
              order: 1,
              metadata: {
                sectionMetaTitle: "Learn React Basics",
                sectionMetaDesc: "Introduction to React concepts",
                sectionMetaKeywords: ["react", "introduction"],
              },
            },
            {
              _id: "102",
              sectionTitle: "Components and Props",
              sectionContent:
                "Components are the building blocks of React applications...",
              slug: "components-and-props",
              group: "Basics",
              order: 2,
              metadata: {
                sectionMetaTitle: "React Components",
                sectionMetaDesc: "Learn about React components and props",
                sectionMetaKeywords: ["components", "props"],
              },
            },
            {
              _id: "103",
              sectionTitle: "State and Lifecycle",
              sectionContent:
                "State allows React components to change their output over time...",
              slug: "state-and-lifecycle",
              group: "Advanced",
              order: 1,
              metadata: {
                sectionMetaTitle: "React State Management",
                sectionMetaDesc: "Understanding state and component lifecycle",
                sectionMetaKeywords: ["state", "lifecycle"],
              },
            },
          ],
        };

        setCourse(mockCourse);

        // Extract unique groups from content
        const uniqueGroups = [
          ...new Set(mockCourse.content.map((item) => item.group)),
        ];
        setGroups(uniqueGroups);

        setIsLoading(false);
      }, 1000);
    }
  }, [courseId]);

  // Group content sections by their group
  const getContentByGroup = (groupName) => {
    if (!course) return [];
    return course.content
      .filter((section) => section.group === groupName)
      .sort((a, b) => a.order - b.order);
  };

  // Open add section modal
  const openAddSectionModal = (groupName) => {
    setCurrentGroup(groupName);
    // Set the initial order to be the next available number for this group
    const groupSections = getContentByGroup(groupName);
    const nextOrder =
      groupSections.length > 0
        ? Math.max(...groupSections.map((s) => s.order)) + 1
        : 1;

    setNewSection({
      ...newSection,
      group: groupName,
      order: nextOrder,
    });

    setShowAddSectionModal(true);
  };

  // Open add group modal
  const openAddGroupModal = () => {
    setShowAddGroupModal(true);
  };

  // Handle adding a new group
  const handleAddGroup = () => {
    if (newGroup.trim()) {
      setGroups([...groups, newGroup.trim()]);
      setNewGroup("");
      setShowAddGroupModal(false);
    }
  };

  // Handle section input change
  const handleSectionChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("metadata.")) {
      const metaField = name.split(".")[1];
      setNewSection({
        ...newSection,
        metadata: {
          ...newSection.metadata,
          [metaField]: value,
        },
      });
    } else {
      setNewSection({
        ...newSection,
        [name]: value,
      });
    }
  };

  // Handle keywords input (comma-separated)
  const handleKeywordsChange = (e) => {
    const keywords = e.target.value
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);

    setNewSection({
      ...newSection,
      metadata: {
        ...newSection.metadata,
        sectionMetaKeywords: keywords,
      },
    });
  };

  // Add a new section
  const handleAddSection = () => {
    if (newSection.sectionTitle.trim() && newSection.sectionContent.trim()) {
      // Generate a slug if empty
      const slug =
        newSection.slug.trim() ||
        newSection.sectionTitle.toLowerCase().replace(/\s+/g, "-");

      const newSectionWithId = {
        ...newSection,
        _id: `temp-${Date.now()}`, // In a real app, this would be generated by the backend
        slug,
        group: currentGroup,
      };

      // Add the new section to the course content
      setCourse({
        ...course,
        content: [...course.content, newSectionWithId],
      });

      // Reset form
      setNewSection({
        sectionTitle: "",
        sectionContent: "",
        slug: "",
        order: 0,
        metadata: {
          sectionMetaTitle: "",
          sectionMetaDesc: "",
          sectionMetaKeywords: [],
        },
      });

      setShowAddSectionModal(false);
    }
  };

  // Open edit section modal
  const openEditSectionModal = (section) => {
    setEditSection(section);
    setShowEditSectionModal(true);
  };

  // Handle edit section input change
  const handleEditSectionChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("metadata.")) {
      const metaField = name.split(".")[1];
      setEditSection({
        ...editSection,
        metadata: {
          ...editSection.metadata,
          [metaField]: value,
        },
      });
    } else {
      setEditSection({
        ...editSection,
        [name]: value,
      });
    }
  };

  // Handle edit keywords input
  const handleEditKeywordsChange = (e) => {
    const keywords = e.target.value
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);

    setEditSection({
      ...editSection,
      metadata: {
        ...editSection.metadata,
        sectionMetaKeywords: keywords,
      },
    });
  };

  // Update section
  const handleUpdateSection = () => {
    if (
      editSection &&
      editSection.sectionTitle.trim() &&
      editSection.sectionContent.trim()
    ) {
      // Update the section in the course content
      setCourse({
        ...course,
        content: course.content.map((section) =>
          section._id === editSection._id ? editSection : section
        ),
      });

      setShowEditSectionModal(false);
    }
  };

  // Delete section
  const handleDeleteSection = (sectionId) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      setCourse({
        ...course,
        content: course.content.filter((section) => section._id !== sectionId),
      });
    }
  };

  // Move section up in order
  const handleMoveUp = (section) => {
    const groupSections = getContentByGroup(section.group);
    const currentIndex = groupSections.findIndex((s) => s._id === section._id);

    if (currentIndex > 0) {
      const previousSection = groupSections[currentIndex - 1];

      // Swap orders
      const updatedContent = course.content.map((s) => {
        if (s._id === section._id) {
          return { ...s, order: previousSection.order };
        }
        if (s._id === previousSection._id) {
          return { ...s, order: section.order };
        }
        return s;
      });

      setCourse({
        ...course,
        content: updatedContent,
      });
    }
  };

  // Move section down in order
  const handleMoveDown = (section) => {
    const groupSections = getContentByGroup(section.group);
    const currentIndex = groupSections.findIndex((s) => s._id === section._id);

    if (currentIndex < groupSections.length - 1) {
      const nextSection = groupSections[currentIndex + 1];

      // Swap orders
      const updatedContent = course.content.map((s) => {
        if (s._id === section._id) {
          return { ...s, order: nextSection.order };
        }
        if (s._id === nextSection._id) {
          return { ...s, order: section.order };
        }
        return s;
      });

      setCourse({
        ...course,
        content: updatedContent,
      });
    }
  };

  // Delete group and all its sections
  const handleDeleteGroup = (groupName) => {
    if (
      window.confirm(
        `Are you sure you want to delete the "${groupName}" group and all its sections?`
      )
    ) {
      setCourse({
        ...course,
        content: course.content.filter(
          (section) => section.group !== groupName
        ),
      });

      setGroups(groups.filter((group) => group !== groupName));
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link
          href="/courses"
          className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
        >
          ← Back to Courses
        </Link>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {course.title} - Content Management
          </h1>
          <button
            onClick={openAddGroupModal}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Add New Group
          </button>
        </div>
        <p className="text-gray-600">{course.description}</p>
        <div className="flex mt-2">
          <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mr-2">
            {course.level}
          </span>
          <span className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded mr-2">
            {course.category}
          </span>
          <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">
            {course.duration}
          </span>
        </div>
      </div>

      {/* Content Groups */}
      {groups.length === 0 ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>No content groups yet. Add a new group to get started.</p>
        </div>
      ) : (
        groups.map((groupName) => (
          <div key={groupName} className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{groupName}</h2>
              <div>
                <button
                  onClick={() => openAddSectionModal(groupName)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                >
                  Add Section
                </button>
                <button
                  onClick={() => handleDeleteGroup(groupName)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete Group
                </button>
              </div>
            </div>

            {/* Sections in this group */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {getContentByGroup(groupName).length === 0 ? (
                <div className="p-4 text-gray-500">
                  No sections in this group yet. Add a new section to get
                  started.
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Slug
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getContentByGroup(groupName).map((section) => (
                      <tr key={section._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {section.order}
                          <div className="inline-flex ml-2">
                            <button
                              onClick={() => handleMoveUp(section)}
                              className="text-gray-400 hover:text-gray-600 mr-1"
                              disabled={
                                getContentByGroup(groupName).indexOf(
                                  section
                                ) === 0
                              }
                            >
                              ↑
                            </button>
                            <button
                              onClick={() => handleMoveDown(section)}
                              className="text-gray-400 hover:text-gray-600"
                              disabled={
                                getContentByGroup(groupName).indexOf(
                                  section
                                ) ===
                                getContentByGroup(groupName).length - 1
                              }
                            >
                              ↓
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {section.sectionTitle}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {section.sectionContent.substring(0, 50)}...
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {section.slug}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openEditSectionModal(section)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSection(section._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ))
      )}

      {/* Add Group Modal */}
      {showAddGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Add New Group</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Group Name
              </label>
              <input
                type="text"
                value={newGroup}
                onChange={(e) => setNewGroup(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter group name"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddGroupModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGroup}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={!newGroup.trim()}
              >
                Add Group
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Section Modal */}
      {showAddSectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              Add New Section to "{currentGroup}"
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Section Title *
              </label>
              <input
                type="text"
                name="sectionTitle"
                value={newSection.sectionTitle}
                onChange={handleSectionChange}
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
                value={newSection.sectionContent}
                onChange={handleSectionChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                placeholder="Enter section content"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Slug (auto-generated if left empty)
              </label>
              <input
                type="text"
                name="slug"
                value={newSection.slug}
                onChange={handleSectionChange}
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
                value={newSection.order}
                onChange={handleSectionChange}
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
                value={newSection.metadata.sectionMetaTitle}
                onChange={handleSectionChange}
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
                value={newSection.metadata.sectionMetaDesc}
                onChange={handleSectionChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
                placeholder="Enter meta description"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Meta Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={newSection.metadata.sectionMetaKeywords.join(", ")}
                onChange={handleKeywordsChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowAddSectionModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSection}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={
                  !newSection.sectionTitle.trim() ||
                  !newSection.sectionContent.trim()
                }
              >
                Add Section
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Section Modal */}
      {showEditSectionModal && editSection && (
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Meta Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={editSection.metadata.sectionMetaKeywords.join(", ")}
                onChange={handleEditKeywordsChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="keyword1, keyword2, keyword3"
              />
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
                disabled={
                  !editSection.sectionTitle.trim() ||
                  !editSection.sectionContent.trim()
                }
              >
                Update Section
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentPage;
