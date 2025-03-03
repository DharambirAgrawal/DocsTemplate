import CourseUpload from "@/app/(dashboard)/components/courses/CourseUpload";
import { getCourseAction } from "../../actions";
const CourseContentPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  const course = await getCourseAction(slug);
  if (!course.success) {
    return <div>Course not found</div>;
  }
  return (
    <>
      <CourseUpload initialcourse={course.data} />
    </>
  );
};

export default CourseContentPage;
