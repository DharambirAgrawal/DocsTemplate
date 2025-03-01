"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AddCourseForm from "@/app/(dashboard)/components/courses/AddCourseForm";

// Define the types for course data
interface Course {
  _id: string;
  title: string;
  description: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  category: string;
  duration: string;
  metadata: {
    views: number;
  };
}

const DashboardViewCourse = () => {
  const [courses, setCourses] = useState<Course[]>([]); // Type the state for courses
  const [showAddModal, setShowAddModal] = useState<boolean>(false); // Type for the modal visibility

  // Mock data for demonstration
  const mockCourses: Course[] = [
    {
      _id: "1",
      title: "Introduction to React",
      description: "Learn the basics of React framework",
      level: "BEGINNER",
      category: "Frontend",
      duration: "4 weeks",
      metadata: { views: 1200 },
    },
    {
      _id: "2",
      title: "Advanced Node.js",
      description: "Deep dive into Node.js architecture",
      level: "ADVANCED",
      category: "Backend",
      duration: "6 weeks",
      metadata: { views: 850 },
    },
  ];

  // For demonstration purposes - in real app, fetch from API
  useEffect(() => {
    setCourses(mockCourses);
  }, []);

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

      {/* Course List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-700">Your Courses</h2>
        </div>

        {courses.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-500">
              No courses available. Add your first course to get started.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {courses.map((course) => (
              <li key={course._id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                        {course.category}
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        {course.level}
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        {course.metadata.views} views
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/dashboard/course/${course._id}/content`}
                      className="text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-md text-sm"
                    >
                      Add Content
                    </Link>
                    <button className="text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md text-sm">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

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
