import React from "react";
import Link from "next/link";
import { getCoursesAction } from "../components/actions";

interface CourseType {
  success: boolean;
  data?: {
    metaData: {
      tags: string[];
      seoTitle: string;
      seoDescription: string;
      seoKeywords: string[];
    };
    title: string;
    description: string;
    duration: string;
    level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    category: string;
    slug: string;
  }[];
}

const CoursesPage = async () => {
  const courses: CourseType = await getCoursesAction();
  if (!courses.success && !courses.data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Courses</h1>
        <p className="text-lg text-gray-600 mb-12">
          Choose from a variety of courses to advance your skills.
        </p>

        {/* Featured Courses Section */}
        <div className="text-left mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Featured Courses
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Explore the most popular courses that our learners love.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {courses.data?.map((course) => (
            <div
              key={course.slug}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {course.title}
                </h3>
                <p className="text-gray-600 mt-2">{course.description}</p>
                <div className="mt-4 flex justify-between text-gray-500 text-sm">
                  <span>{course.duration}</span>
                  <span>{course.level}</span>
                </div>
              </div>
              <div className="p-4 bg-gray-100 text-center">
                <Link
                  href={`/courses/${course.slug}`}
                  className="inline-block text-indigo-600 font-semibold hover:text-indigo-800"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-600 text-white py-12 mt-16">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to Boost Your Skills?
          </h2>
          <p className="text-lg mb-6">
            Take the first step towards mastering new skills today. Join our
            community of learners.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-800 transition-colors duration-300"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
