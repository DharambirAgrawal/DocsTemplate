import CourseTable from "@/app/(dashboard)/components/courses/CourseTable";

const DashboardViewCourse = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Course Management</h1>
      </div>
      <CourseTable />
    </div>
  );
};

export default DashboardViewCourse;
