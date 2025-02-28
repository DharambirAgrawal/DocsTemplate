import Navigation from "@/components/Header";
import { notFound } from "next/navigation";
const CoursesPage = () => {
  return notFound();
  return (
    <>
      <Navigation />
      <div>CoursesPage</div>
    </>
  );
};

export default CoursesPage;
