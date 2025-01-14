import { Metadata } from "next";
import DefaultLayout from "@/app/(adminDashboard)/components/DefaultLayout";
import Breadcrumb from "@/components/ui/Breadcrumbs/Breadcrumb";
import CalendarBox from "@/app/(adminDashboard)/components/CalenderBox";

export const metadata: Metadata = {
  title: "Next.js Calender Page | NextAdmin - Next.js Dashboard Kit",
  description:
    "This is Next.js Calender page for NextAdmin  Tailwind CSS Admin Dashboard Kit",
  // other metadata
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Calendar" />

        <CalendarBox />
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
