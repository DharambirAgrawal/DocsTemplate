"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DraggableTable from "@/app/(dashboard)/components/courses/DragTable";
import { updateCourseContentAction } from "../../dashboard/course/actions";
import { showToast } from "@/features/ToastNotification/useToast";
import AddContent from "./AddContent";
import EditContent from "./EditContent";
import { getCourseAction } from "../../dashboard/course/actions";

interface CourseSectionType {
  _id: string;
  title: string;
  content: string;
  slug: string;
  order: number;
  metaData: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
  };
}

interface CourseType {
  title: string;
  description: string;
  level: string;
  category: string;
  duration: string;
  slug: string;
  contentGroups: {
    _id: string;
    title: string;
    order: number;
    sections: CourseSectionType[];
  }[];
}

interface CourseProps {
  initialcourse: CourseType;
}

const CourseUpload = ({ initialcourse }: CourseProps) => {
  const [course, setCourse] = useState<CourseType>(initialcourse);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);

  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [newGroup, setNewGroup] = useState("");
  const [editSection, setEditSection] = useState<CourseSectionType | null>(
    null
  );

  const [showEditSectionModal, setShowEditSectionModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState<{
    _id: string;
    title: string;
    order: number;
    sections: CourseSectionType[];
  }>();

  // Function to refresh course data
  const refreshCourseData = async () => {
    setIsLoading(true);
    try {
      const refreshedCourse = await getCourseAction(course.slug);
      if (refreshedCourse.success) {
        setCourse(refreshedCourse.data);
      } else {
        showToast("error", "Failed to refresh course data");
      }
    } catch (error) {
      console.error("Error refreshing course data:", error);
      showToast("error", "An error occurred while refreshing data");
    } finally {
      setIsLoading(false);
    }
  };

  // Open add section modal
  const openAddSectionModal = (sectionData: {
    _id: string;
    title: string;
    order: number;
    sections: CourseSectionType[];
  }) => {
    setSelectedSection(sectionData);
    setShowAddSectionModal(true);
  };

  const handleUpdateOrder = async (updatedContents: CourseSectionType[]) => {
    // Implement the logic to handle the updated order of sections
  };

  // Open add group modal
  const openAddGroupModal = () => {
    setShowAddGroupModal(true);
  };

  // Handle adding a new group
  const handleAddGroup = async () => {
    if (newGroup.trim()) {
      setIsLoading(true);
      const formData = {
        title: newGroup,
        slug: course.slug,
      };
      try {
        const res = await updateCourseContentAction(formData, "group");
        if (!res.success) {
          showToast("error", res.error?.message || "Something went wrong");
        } else {
          showToast("success", res.message || "Group published successfully");
          // Refresh the course data after successful group addition
          await refreshCourseData();
        }
      } catch (error) {
        console.error("Error adding group:", error);
        showToast("error", "An error occurred while adding the group");
      } finally {
        setNewGroup("");
        setShowAddGroupModal(false);
        setIsLoading(false);
      }
    }
  };

  // Open edit section modal
  const openEditSectionModal = (sectionContent: CourseSectionType) => {
    setEditSection(sectionContent);
    setShowEditSectionModal(true);
  };

  // Delete section
  const handleDeleteSection = async (sectionId: string) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      // Implement delete functionality here
      // After successful deletion, refresh the course data
      await refreshCourseData();
    }
  };

  // Delete group and all its sections
  const handleDeleteGroup = async (groupId: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete the group and all its sections?`
      )
    ) {
      // Implement delete group functionality here
      // After successful deletion, refresh the course data
      await refreshCourseData();
    }
  };

  // Close section modal and refresh data
  const handleSectionModalClose = async (wasAdded: boolean) => {
    setShowAddSectionModal(false);
    if (wasAdded) {
      await refreshCourseData();
    }
  };

  // Close edit modal and refresh data
  const handleEditModalClose = async () => {
    setShowEditSectionModal(false);
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
          href="/dashboard/course/upload"
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
      {course.contentGroups.length === 0 ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>No content groups yet. Add a new group to get started.</p>
        </div>
      ) : (
        course.contentGroups.map((groupContent) => (
          <div key={groupContent._id} className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{groupContent.title}</h2>
              <div>
                <button
                  onClick={() => openAddSectionModal(groupContent)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                >
                  Add Section
                </button>
                <button
                  onClick={() => handleDeleteGroup(groupContent._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete Group
                </button>
              </div>
            </div>

            {/* Sections in this group */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {groupContent.sections.length === 0 ? (
                <div className="p-4 text-gray-500">
                  No sections in this group yet. Add a new section to get
                  started.
                </div>
              ) : (
                <>
                  <DraggableTable
                    ondelete={handleDeleteSection}
                    onedit={openEditSectionModal}
                    course={groupContent.sections}
                    onUpdateOrder={handleUpdateOrder}
                  />
                </>
              )}
            </div>
          </div>
        ))
      )}

      {/* Add Group Modal */}
      {showAddGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
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
      {showAddSectionModal && selectedSection && (
        <AddContent
          setShowAddSectionModal={handleSectionModalClose}
          groupContent={selectedSection}
          slug={course.slug}
        />
      )}

      {/* Edit Section Modal */}
      {showEditSectionModal && editSection && (
        <EditContent
          setShowEditSectionModal={handleEditModalClose}
          editContent={editSection}
        />
      )}
    </div>
  );
};

export default CourseUpload;
