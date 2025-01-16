import { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CalendarBox from "@/app/(dashboard)/components/CalenderBox";

export const metadata: Metadata = {
  title: "Next.js Calender Page | NextAdmin - Next.js Dashboard Kit",
  description:
    "This is Next.js Calender page for NextAdmin  Tailwind CSS Admin Dashboard Kit",
  // other metadata
};

const CalendarPage = () => {
  return (

      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Calendar" />

        <CalendarBox />
      </div>

  );
};

export default CalendarPage;
