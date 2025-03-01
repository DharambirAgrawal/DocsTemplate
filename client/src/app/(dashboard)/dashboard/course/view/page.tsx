"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AddCourseForm from "@/app/(dashboard)/components/courses/AddCourseForm";
import CourseTable from "@/app/(dashboard)/components/courses/CourseTable";

const DashboardViewCourse = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false); // Type for the modal visibility

  // For demonstration purposes - in real app, fetch from API

  // Function to handle opening modal
  const openAddCourseModal = (): void => {
    setShowAddModal(true);
  };

  // Function to close modal
  const closeAddCourseModal = (): void => {
    setShowAddModal(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Course Management</h1>
        <button
          onClick={openAddCourseModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New Course
        </button>
      </div>
      <CourseTable />

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-lg max-w-lg w-full mx-4 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Add New Course
              </h3>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <p className="text-sm text-gray-600 mb-4">
                Create a new course by filling out the information below. You
                can add content sections later.
              </p>

              {/* Add course form will be implemented in the next part */}
              <AddCourseForm onCancel={closeAddCourseModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardViewCourse;
