"use client";
import { useState, useEffect } from "react";
import { getCourses } from "../../dashboard/course/actions";
import { cache } from "react";
import Link from "next/link";
import { deleteCourseAction } from "../../dashboard/course/actions";
import { useConfirmation } from "@/features/Confirmation/AdvanceConfirmation";
import { showToast } from "@/features/ToastNotification/useToast";
import EditCourseForm from "./EditCourseForm";

// Define the types for course data
interface Course {
  title: string;
  slug: string;
  description: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  category: string;
  duration: string;
  metaData: {
    tags: string[];
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
    views?: number;
  };
}
const getCourseCache = cache(getCourses);

const CourseTable = () => {
  const [courses, setCourses] = useState<Course[]>([]); // Type the state for courses
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { confirm } = useConfirmation();
  const handleRefresh = async () => {
    setIsLoading(true);
    const res = await getCourseCache();
    if (res.success) {
      setCourses(res.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Fetch courses from API
    const fetchCourses = async () => {
      setIsLoading(true);
      const res = await getCourseCache();
      if (res.success) {
        setCourses(res.data);
      }
      setIsLoading(false);
    };
    fetchCourses();
    // setCourses(mockCourses);
  }, []);

  const deleteCourse = async (slug: string) => {
    const result = await confirm({
      title: "Delete Account",
      description:
        "Are you sure you want to delete Course? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
      contentComponent: ({ onDataChange }) => (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Type "DELETE" to confirm
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 sm:text-sm"
            placeholder="DELETE"
            onChange={(e) => onDataChange(e.target.value)}
          />
        </div>
      ),
    });
    if (result.confirmed && result.data === "DELETE") {
      const res = await deleteCourseAction(slug);
      if (res.success) {
        return showToast("success", res.message || "Success");
        handleRefresh();
      }
      showToast("error", res.error?.message || "Something went wrong");
      return;
    }
  };

  const closeEditCourseModal = (): void => {
    setShowEditModal(false);
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-700">Your Courses</h2>
        <button onClick={handleRefresh} className="">
          refresh
        </button>
      </div>
      {isLoading ? (
        <div className="p-10 text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="p-10 text-center">
          <p className="text-gray-500">
            No courses available. Add your first course to get started.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {courses.map((course) => (
            <li key={course.slug} className="px-6 py-4 hover:bg-gray-50">
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
                      {course.metaData.views} views
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/dashboard/course/upload/${course.slug}`}
                    className="text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-md text-sm"
                  >
                    Add Content
                  </Link>
                  <button
                    className="text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md text-sm"
                    onClick={() => handleEdit(course)}
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md text-sm"
                    onClick={() => deleteCourse(course.slug)}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showEditModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-lg max-w-lg w-full mx-4 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Edit Course</h3>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <p className="text-sm text-gray-600 mb-4">
                Edit the details of the course below.
              </p>

              {/* Add course form will be implemented in the next part */}
              <EditCourseForm
                onCancel={closeEditCourseModal}
                course={selectedCourse}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseTable;
