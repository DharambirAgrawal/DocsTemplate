import dynamic from "next/dynamic";
import Loader from "@/components/ui/Loader";
import DefaultLayout from "@/components/DefaultLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DefaultLayout>{children}</DefaultLayout>
    </>
  );
}
